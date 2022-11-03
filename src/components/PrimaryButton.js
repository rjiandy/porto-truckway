import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

import styles from './styles/PrimaryButton-style';


const PrimaryButton = (props) => {
  const {
    color,
    label,
    onPress,
    disabled,
    isLoading,
    customStyles,
    labelStyles,
    invert,
    ...others
  } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} {...others}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          color && styles.color,
          invert && styles.invert,
          invert && disabled && styles.disabledInvert,
          customStyles
        ]}
      >
        {!isLoading ? (
          <Text
            style={[
              styles.label,
              disabled && styles.disabledText,
              invert && styles.invertText,
              invert && disabled && styles.disabledInvertText,
              labelStyles
            ]}
          >{label}</Text>
        ) : (
          <ActivityIndicator size="small" color={colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

PrimaryButton.propTypes = {
  color: PropTypes.instanceOf(Object),
  label: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  invert: PropTypes.bool,
  customStyles: PropTypes.instanceOf(Object),
  labelStyles: PropTypes.instanceOf(Object)

};

export default PrimaryButton;
