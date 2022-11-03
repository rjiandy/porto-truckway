import React from 'react';
import PropTypes from 'prop-types';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

const MapDirections = (props) => {
  const {
    destination,
    origin,
    onStart,
    onReady,
    onError
  } = props;

  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={Config.MAP_APIKEY}
      strokeWidth={6}
      strokeColor="#0388FF"
      optimizeWaypoints
      language="id"
      mode="DRIVING"
      resetOnChange
      onStart={onStart}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default MapDirections;

MapDirections.propTypes = {
  destination: PropTypes.instanceOf(Object),
  origin: PropTypes.instanceOf(Object),
  onStart: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func
};
