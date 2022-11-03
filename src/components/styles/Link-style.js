import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';

const styles = StyleSheet.create({
  label: {
    color: colors.blue,
    fontSize: 14,
    // textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  disabled: {
    color: colors.brightNavyBlue
  }
});

export default styles;
