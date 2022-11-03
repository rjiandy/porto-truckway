import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles/Row-style';

const Row = (props) => {
  const { style, ...others } = props;
  return <View style={[styles.container, style]} {...others} />;
};

export default Row;

Row.propTypes = {
  style: PropTypes.instanceOf(Object)
};
