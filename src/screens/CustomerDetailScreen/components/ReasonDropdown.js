import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  Icon,
  StyledText
} from '../../../components';

import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  ddContainer: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    minHeight: 40,
    marginTop: 6,
    marginBottom: 14,
    flexDirection: 'row'
  },
  ddIcon: {
    position: 'absolute',
    right: 14
  },
  disabledContainer: {
    borderColor: colors.silver,
    backgroundColor: colors.gainsboro
  }
});

export default function ReasonDropdown(props) {
  const {
    label,
    onPress,
    disabled,
    isRedelivery,
    isReschedule
  } = props;
  let mainTextStyle = colors.black;

  if (label) {
    mainTextStyle = {
      color: colors.black,
      fontWeight: '700'
    };
  } else {
    mainTextStyle = { color: colors.lightGray };
  }

  return (
    <TouchableOpacity
      style={[styles.ddContainer, disabled && styles.disabledContainer]}
      onPress={() => onPress()}
      disabled={disabled}
    >
      <StyledText
        style={[mainTextStyle, disabled && { color: colors.silver }]}
      >
        {label ? label : `'Pilih alasan ${isRedelivery ? 'redelivery' : isReschedule ? 'reschedule' : 'penolakan'}`}
      </StyledText>
      <Icon
        name="chevron-down"
        style={styles.ddIcon}
        color={disabled ? colors.silver : colors.davysGrey}
        size={18}
      />
    </TouchableOpacity>
  );
}
