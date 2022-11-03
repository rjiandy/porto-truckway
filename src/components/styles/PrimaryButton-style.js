import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.brightNavyBlue,
    borderRadius: 4,
    justifyContent: 'center',
    height: 40
  },
  color: {
    backgroundColor: colors.cinnabar
  },
  label: {
    color: colors.white,
    fontSize: 14
  },
  disabled: {
    backgroundColor: colors.cultured2
  },
  invert: {
    backgroundColor: colors.white,
    borderColor: colors.brightNavyBlue,
    borderWidth: 1
  },
  invertText: {
    color: colors.brightNavyBlue
  },
  disabledInvert: {
    borderColor: colors.silver
  },
  disabledInvertText: {
    color: colors.silver
  },
  disabledText: {
    color: colors.silver
  }
});

export default styles;
