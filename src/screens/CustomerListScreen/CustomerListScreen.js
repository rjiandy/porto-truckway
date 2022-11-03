import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import RNLocation from 'react-native-location';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

import {
  Page,
  Section,
  StyledText,
  Icon,
  Header,
  Map
} from '../../components';

import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../utils/constants';
// import { deviceWidth } from '../../utils/platform';

import notFoundImg from '../../assets/box_questionmark.png';

import TabGroup from './components/TabGroup';
import CustomerCard from './components/CustomerCard';


const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  searchContainerAbsolute: {
    position: 'absolute',
    height: 52,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999
  },
  searchBox: {
    width: '100%',
    height: 40,
    flexDirection: 'row'
  },
  searchInputContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingLeft: 12,
    overflow: 'hidden',
    borderRadius: 6,
    flexDirection: 'row',
    backgroundColor: colors.white
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchButton: {
    backgroundColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    width: 61,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignSelf: 'flex-end'
  },
  body: {
    backgroundColor: colors.lightGray,
    flex: 1,
    maxHeight: 240
  },
  interactableContent: {
    marginTop: 132,
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  interactableButtonContainer: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  interactableButton: {
    backgroundColor: colors.gainsboro,
    width: 60,
    height: 2
  },
  emptySearchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 58
  }
});

function groupByStatus(customerLists, status, searchQuery) {
  return customerLists.filter(
    item => (item.status === status && item.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
}

export function CustomerListScreen(props) {
  const { customerLists, selectCustomer, shipmentPlanNumber } = props;

  const [searchValue, setSearchValue] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const [allListCount, setAllListCount] = useState(0);
  const [pendingListCount, setPendingListCount] = useState(0);
  const [doneListCount, setDoneListCount] = useState(0);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  const [coordinates, setCoordinates] = useState([]);
  const [region, setRegion] = useState({
    latitude: -6.21462,
    longitude: 106.84513,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  const [navToLoc, setNavToLoc] = useState(false);
  const [showCurrLocButton, setShowCurrLocButton] = useState(true);

  const [
    pendingLists,
    filteredCustomerLists
  ] = [
    groupByStatus(customerLists, 'pending', activeSearch),
    customerLists.filter(({ customerName }) => customerName.toLowerCase().includes(activeSearch.toLowerCase()))
  ];

  const onCustomerPress = (rawData) => {
    selectCustomer(rawData);
    Actions.customerSummaryScreen();
  };

  const searchNotFound = () => {
    return (
      <Section style={styles.emptySearchContainer}>
        <Section style={{ left: 20 }}>
          <Image
            source={notFoundImg}
            style={{ width: 75, height: 75 }}
            resizeMode="contain"
          />
        </Section>
        <Section style={{ paddingTop: 12 }}>
          <StyledText style={{ textAlign: 'center' }} font="Roboto-14-black-bold">Maaf</StyledText>
          <StyledText style={{ textAlign: 'center' }} font="Roboto-12-black">Customer yang Anda cari{'\n'}tidak dapat ditemukan.</StyledText>
        </Section>
      </Section>
    );
  };

  const AllList = () => {
    if (filteredCustomerLists.length === 0) {
      return (
        searchNotFound()
      );
    }

    return (
      <>
        {
          filteredCustomerLists.map((item, i) => {
            return (
              <CustomerCard
                key={i}
                status={item.status}
                isCOD={item.isCOD}
                isCBD={item.isCBD}
                isRedelivery={item.isRedelivery}
                isReschedule={item.isReschedule}
                isPickup={item.isPickup}
                customerName={item.customerName}
                location={item.location}
                distributionChannel={item.distributionChannel}
                onPress={() => onCustomerPress(item.rawData)}
              />
            );
          })
        }
      </>
    );
  };

  const PendingList = () => {
    if (pendingLists.length === 0) {
      return (
        searchNotFound()
      );
    }
    return (
      <>
        {
          pendingLists.map((item, i) => {
            return (
              <CustomerCard
                key={i}
                status={item.status}
                isCOD={item.isCOD}
                isCBD={item.isCBD}
                isRedelivery={item.isRedelivery}
                isReschedule={item.isReschedule}
                isPickup={item.isPickup}
                customerName={item.customerName}
                location={item.location}
                distributionChannel={item.distributionChannel}
                onPress={() => onCustomerPress(item.rawData)}
              />
            );
          })
        }
      </>
    );
  };

  const DoneList = () => {
    const doneLists = customerLists.filter(item => {
      const { status } = item;
      const isSuccessSubmit = status === 'success' || status === 'redelivery' || status === 'rescheduled';
      return (
        (isSuccessSubmit) && item.customerName.toLowerCase().includes(activeSearch.toLowerCase())
      );
    });

    if (doneLists.length === 0) {
      return (
        searchNotFound()
      );
    }

    return (
      <>
        {
          doneLists.map((item, i) => {
            return (
              <CustomerCard
                key={i}
                status={item.status}
                isCOD={item.isCOD}
                isCBD={item.isCBD}
                isRedelivery={item.isRedelivery}
                isReschedule={item.isReschedule}
                isPickup={item.isPickup}
                customerName={item.customerName}
                location={item.location}
                distributionChannel={item.distributionChannel}
                onPress={() => onCustomerPress(item.rawData)}
              />
            );
          })
        }
      </>
    );
  };

  const mappingLocation = () => {
    let coord = [];
    customerLists.forEach((item, index) => {
      if ((item.latitude != null || item.longitude != null) && (Number(item.latitude.replace(/,/g, '.')) || Number(item.longitude.replace(/,/g, '.')))) {
        coord.push(
          {
            ...item,
            id: index,
            latitude: Number(item.latitude) ? Number(item.latitude) : Number(item.latitude.replace(/,/g, '.')),
            longitude: Number(item.longitude) ? Number(item.longitude) : Number(item.longitude.replace(/,/g, '.'))
          }
        );
      }
    });

    setCoordinates(coord);
  };

  useEffect(() => {
    if (filteredCustomerLists.length > 0) {
      let pending = [];
      let done = [];

      filteredCustomerLists.forEach((item) => {
        const { status } = item;
        if (status === 'pending') {
          pending.push(item);
        } else if (status === 'success' || status === 'redelivery' || 'rescheduled') {
          done.push(item);
        }
      });
      setAllListCount(filteredCustomerLists.length);
      setPendingListCount(pending.length);
      setDoneListCount(done.length);
    } else {
      setAllListCount(0);
      setPendingListCount(0);
      setDoneListCount(0);
    }
  }, [filteredCustomerLists]);

  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     ({ coords }) => {
  //       setCurrentPosition({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude
  //       });
  //     },
  //     (e) => ToastAndroid.show(e.message, ToastAndroid.LONG),
  //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
  //   );
  //   mappingLocation();
  //   return () => Geolocation.clearWatch(watchId);
  // }, []);

  useEffect(() => {
    let isMounted = true;
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
          if (isMounted) {
            setCurrentPosition({
              latitude: locations[0].latitude,
              longitude: locations[0].longitude
            });
          }
        });

        mappingLocation();

        return () => unsubscribe;
      }
    });

    return () => { isMounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showCurrLocButton == null) {
      setTimeout(() => {
        setShowCurrLocButton(true);
      }, 1000);
    }
  }, [showCurrLocButton]);

  useEffect(() => {
    mappingLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerLists]);

  return (
    <Page style={{ flex: 1 }}>
      <Header title={`Shipment Plan No. ${shipmentPlanNumber}`} />
      <Section style={styles.body}>
        <Section style={[styles.searchContainer, styles.searchContainerAbsolute]}>
          <Section style={styles.searchBox}>
            <Section style={styles.searchInputContainer}>
              <Section style={styles.textInputContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (searchValue.length > 0) {
                      setSearchValue('');
                      setActiveSearch('');
                    }
                  }}
                  style={{ width: 24 }}
                  disabled={searchValue.length < 1 && true}
                >
                  <Icon
                    name={searchValue.length < 1 ? 'md-search' : 'md-close'}
                    size={20}
                    style={{ color: colors.spanishGray }}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Cari customer"
                  value={searchValue}
                  onChangeText={(val) => setSearchValue(val)}
                  onSubmitEditing={() => {
                    setActiveSearch(searchValue);
                  }}
                  style={{ flex: 1, height: 40 }}
                />
              </Section>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                  setActiveSearch(searchValue);
                  Keyboard.dismiss();
                }}
              >
                <StyledText style={fonts['Roboto-14-white']}>Cari</StyledText>
              </TouchableOpacity>
            </Section>
          </Section>
        </Section>

        <Section style={{ flex: 1, ...StyleSheet.absoluteFillObject }}>
          <Map
            region={region}
            coordinates={coordinates}
            currentPosition={currentPosition}
            onRegionChangeComplete={(_region) => {
              setRegion(_region);
              setNavToLoc(false);
            }}
            staticMap
            navToLoc={navToLoc}
          />

        </Section>
      </Section>
      <TabGroup
        headers={[`Semua (${allListCount})`, `Pending (${pendingListCount})`, `Selesai (${doneListCount})`]}
        contents={[
          <AllList />,
          <PendingList />,
          <DoneList />
        ]}
      />
    </Page>
  );
}

export function mapStateToProps(state) {
  const { customerListStore, shipmentPlanStore } = state;
  return {
    customerLists: customerListStore.activeCustomerLists.map((data) => {
      const { shipment_status_customer, payment_types } = data;
      const { delivery, pickup } = shipment_status_customer;

      const isCOD = payment_types.filter((type) => type === 'COD').length > 0;
      const isCBD = payment_types.filter((type) => type === 'CBD').length > 0;

      const deliveryStatus = delivery === 'PARTIAL' || delivery === 'FAILED' ? 'success' : delivery;
      const pickupStatus = pickup === 'PARTIAL' || pickup === 'FAILED' ? 'success' : pickup;
      const customerStatus = delivery ? deliveryStatus : pickupStatus;

      return {
        status: customerStatus.toLowerCase(),
        isCOD,
        isCBD,
        isRedelivery: data.redelivery_count > 0,
        isReschedule: data.reschedule_count > 0,
        isPickup: data.pickup_count > 0,
        distributionChannel: data.distribution_channel,
        customerName: data.shiptoparty_name,
        latitude: data.latitude,
        longitude: data.longitude,
        location: `${data.villages} - ${data.city}`,
        rawData: data
      };
    }),
    shipmentPlanNumber: shipmentPlanStore.selectedShipment
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    selectCustomer: (activeCustomer) => dispatch({
      type: 'SELECT_CUSTOMER',
      selectedCustomer: activeCustomer.shiptoparty_code,
      activeCustomer
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListScreen);
