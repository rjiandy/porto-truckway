import { Platform, Dimensions } from 'react-native';

const isAndroid = () => Platform.OS === 'android';
const isIOS = () => Platform.OS === 'ios';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export {
  isAndroid,
  isIOS,
  deviceHeight,
  deviceWidth
};
