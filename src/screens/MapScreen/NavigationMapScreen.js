import React, { useState, useEffect } from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import RNLocation from 'react-native-location';

import {
  Header,
  Map,
  Page,
  PrimaryButton,
  Section
} from '../../components';

import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../utils/constants';

function MapNavigationScreen(props) {
  // eslint-disable-next-line no-unused-vars
  const [region, setRegion] = useState({
    latitude: -6.21462,
    longitude: 106.84513,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  const { customerData } = props;
  const { customerName, latitude, longitude } = customerData;

  useEffect(() => {
    RNLocation.configure({
      distanceFilter: 5.0,
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy'
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000 // Milliseconds
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel'
        }
      }
    }).then(granted => {
      if (granted) {
        const unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
          setCurrentPosition({
            latitude: locations[0].latitude,
            longitude: locations[0].longitude
          });
        });

        return () => unsubscribe;
      }
    }).catch((e) => ToastAndroid.show(e.message, ToastAndroid.SHORT));
  }, []);

  return (
    <Page>
      <Header title="Detail Toko" />
      <Section style={{ flex: 1 }}>
        <Section style={{ ...StyleSheet.absoluteFillObject }}>
          <Map
            region={region}
            coordinates={[{ latitude, longitude }]}
            currentPosition={currentPosition}
            onRegionChangeComplete={(_region) => {
              // setRegion(_region);
            }}
          />
        </Section>
      </Section>
      <Section style={{ height: 64, justifyContent: 'center', paddingHorizontal: 14 }}>
        <PrimaryButton
          label="Buka Peta"
          onPress={() => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${latitude},${longitude}`;
            const label = `${customerName}`;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            });
            Linking.openURL(url);
          }}
        />
      </Section>
    </Page>
  );
}

function mapStateToProps(state) {
  const { customerListStore } = state;
  const { activeCustomer } = customerListStore;

  if (activeCustomer.latitude && activeCustomer.latitude !== 0) {
    const formattedCustomerData = {
      customerName: activeCustomer.shiptoparty_name,
      latitude: Number(activeCustomer.latitude),
      longitude: Number(activeCustomer.longitude)
    };

    return {
      customerData: formattedCustomerData
    };
  }

  return {
    customerData: {
      customerName: activeCustomer.shiptoparty_name,
      latitude: 0,
      longitude: 0
    }
  };


}

export default connect(mapStateToProps, null)(MapNavigationScreen);
