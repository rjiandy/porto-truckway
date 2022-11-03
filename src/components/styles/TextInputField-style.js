import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    height: 40,
    flexDirection: 'row'
  },
  containerError: {
    borderColor: colors.cinnabar
  },
  containerSuccess: {
    borderColor: colors.darkPastelGreen
  },
  label: {
    color: colors.davysGrey,
    fontSize: 14,
    paddingBottom: 3,
    paddingLeft: 6
  },
  labelError: {
    color: colors.cinnabar
  },
  labelSuccess: {
    color: colors.darkPastelGreen
  },
  textInput: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
    height: 40,
    borderBottomWidth: 0
  }
});

export default styles;
