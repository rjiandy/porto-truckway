import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue
  },
  color: {
    backgroundColor: colors.cinnabar
  },
  label: {
    color: colors.brightNavyBlue,
    fontSize: 14
  },
  disabled: {
    backgroundColor: colors.lightSteelBlue
  }
});

const SecondaryButton = (props) => {
  const {
    color,
    label,
    onPress,
    disabled,
    isLoading,
    customStyles,
    labelStyles,
    ...others
  } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} {...others}>
      <View style={[styles.container, disabled && styles.disabled, color && styles.color, customStyles]}>
        {!isLoading ? (
          <Text style={[styles.label, labelStyles]}>{label}</Text>
        ) : (
          <ActivityIndicator size="small" color={colors.brightNavyBlue} />
        )}
      </View>
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  color: PropTypes.instanceOf(Object),
  label: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  customStyles: PropTypes.instanceOf(Object),
  labelStyles: PropTypes.instanceOf(Object)

};

export default SecondaryButton;
