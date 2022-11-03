import { StyleSheet } from 'react-native';

import colors from '../../themes/colors';
// import { deviceHeight } from '../../utils/platform';

const styles = StyleSheet.create({
  containerModal: {
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  containerBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.7)'
  },
  containerButton: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'flex-end'
  },
  title: {
    textAlign: 'center'
  },
  titleContainer: {
    paddingHorizontal: 40,
    paddingTop: 14
  }
});

export default styles;
