
import React from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

import styles from './styles/TextInputField-style';

const TextInputBox = (props) => {
  const {
    label,
    labelError,
    labelStyle,
    style,
    onError,
    onSuccess,
    iconName,
    iconSize,
    iconColor,
    ...others
  } = props;

  return (
    <View>
      <Text style={[styles.label, onError && styles.labelError, labelStyle, onSuccess && styles.labelSuccess]}>
        {label}
        {onError && (
          <Text style={{ fontSize: 10 }}>{` ${labelError}`}</Text>
        )}
      </Text>
      <View style={[styles.container, onError && styles.containerError, onSuccess && styles.containerSuccess]}>
        {iconName && (
          <View style={{ flex: 0.07, justifyContent: 'center', paddingLeft: 8 }}>
            <Icon
              name={iconName}
              color={iconColor || colors.gainsboro}
              size={iconSize || 20}
            />
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
          <TextInput
            autoCorrect={false}
            placeholderTextColor={colors.lightGray}
            selectionColor={colors.lighterGray}
            underlineColorAndroid="transparent"
            style={[styles.textInput, style]}
            {...others}
          />
        </View>
      </View>
    </View>
  );
};

export default TextInputBox;

TextInputBox.propTypes = {
  label: PropTypes.string,
  labelError: PropTypes.string,
  labelStyle: PropTypes.instanceOf(Object),
  style: PropTypes.instanceOf(Object),
  onError: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onSuccess: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

TextInputBox.defaultProps = {
  labelError: ''
};
