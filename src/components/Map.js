import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import colors from '../themes/colors';

import { deviceWidth, deviceHeight } from '../utils/platform';

import pinStorePoint from '../assets/store_point.png';

import MapDirection from './MapDirection';

function Map(props) {
  const {
    region,
    coordinates,
    onRegionChangeComplete,
    currentPosition,
    staticMap,
    navToLoc,
    selectedMarker,
    selectedCard,
    fitToCoordinates,
    ...others
  } = props;

  const _map = useRef(null);

  const MarkerStatus = () => {
    let icon = pinStorePoint;
    const list = coordinates.map((coord, index) => (
      <Marker
        key={`coordinate_${index}`}
        coordinate={coord}
        identifier={`${coord.id}`}
        title={coord.customerName.trim()}
      >
        <Image
          source={icon}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </Marker>
    ));

    return list;
  };

  useEffect(() => {
    if (_map.current && currentPosition.latitude === 0) {
      _map.current.fitToCoordinates([...coordinates], {
        edgePadding: {
          right: (deviceWidth / 20),
          bottom: (deviceHeight / 20),
          left: (deviceWidth / 20),
          top: (deviceHeight / 20)
        },
        animated: true
      });
    } else {
      _map.current.fitToCoordinates([currentPosition, ...coordinates], {
        edgePadding: {
          right: (deviceWidth / 20),
          bottom: (deviceHeight / 20),
          left: (deviceWidth / 20),
          top: (deviceHeight / 20)
        },
        animated: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  useEffect(() => {
    if (fitToCoordinates) {
      _map.current.fitToCoordinates([...coordinates], {
        edgePadding: {
          right: (deviceWidth / 20),
          bottom: (deviceHeight / 20),
          left: (deviceWidth / 20),
          top: (deviceHeight / 20)
        },
        animated: true
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitToCoordinates]);

  useEffect(() => {
    if (navToLoc) {
      _map.current.animateToRegion({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navToLoc]);

  useEffect(() => {
    if (selectedCard) {
      _map.current.animateToRegion({
        latitude: selectedCard.latitude,
        longitude: selectedCard.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard]);

  useEffect(() => {
    if (_map.current) {
      const coord = selectedMarker ? [selectedMarker] : [currentPosition, ...coordinates];

      if (selectedMarker) {
        _map.current.fitToCoordinates(coord, {
          edgePadding: {
            right: (deviceWidth / 20),
            bottom: (deviceHeight / 20),
            left: (deviceWidth / 20),
            top: (deviceHeight / 20)
          },
          animated: true
        });
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker]);

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={region}
      ref={_map}
      zoomEnabled
      // zoomControlEnabled
      rotateEnabled
      scrollEnabled
      showsBuildings
      showsScale
      minZoomLevel={5}
      maxZoomLevel={20}
      loadingEnabled
      showsIndoors
      loadingIndicatorColor={colors.brightNavyBlue}
      // onRegionChange={_region => onRegionChange(_region)}
      onRegionChangeComplete={_region => onRegionChangeComplete(_region)}
      animated
      // showsUserLocation
      showsMyLocationButton={false}
      initialCamera={{
        center: {
          latitude: -6.175094,
          longitude: 106.8272,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 13
      }}
      {...others}
    >
      {staticMap && (
        <>
          {MarkerStatus()}
          {/* disable poline */}
          {/* <MapView.Polyline
            // key={i}
            coordinates={coordinates}
            strokeColor={colors.spanishGray}
            strokeWidth={3}
          /> */}
        </>
      )}

      {!staticMap && (
        <>
          <Marker coordinate={coordinates[0]} pinColor="red" />
          {currentPosition.latitude !== 0 && coordinates && coordinates.length > 0 && (
            <MapDirection
              origin={currentPosition}
              destination={coordinates[0]}
              onStart={(params) => {
              }}
              onReady={(result) => {
                // _map.current.fitToCoordinates(result.coordinates, {
                //   edgePadding: {
                //     right: (deviceWidth / 20),
                //     bottom: (deviceHeight / 20),
                //     left: (deviceWidth / 20),
                //     top: (deviceHeight / 20)
                //   },
                //   animated: true
                // });
              }}
              onError={(error) => { throw new Error(error); }}
            />
          )}
        </>
      )}
    </MapView>
  );
}

export default Map;
