import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles/Divider-style';

const Divider = (props) => {
  const { style } = props;
  return (
    <View style={[styles.line, style]} />
  );
};

export default Divider;

Divider.propTypes = {
  style: PropTypes.instanceOf(Object)
};
