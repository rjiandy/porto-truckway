import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles/Link-style';

const Link = (props) => {
  const { disabled, label, onPress } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={[styles.label, disabled && styles.disabled]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Link;

Link.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onPress: PropTypes.func
};

Link.defaultProps = {
  disabled: false,
  label: '',
  onPress: () => {}
};
