/* eslint-disable no-undef */
import { NativeModules } from 'react-native';
// import 'jest-enzyme';
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });


NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

NativeModules.RNGestureHandlerModule = {
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  State: {},
  Directions: {}
};

jest.mock(
  'react-native-router-flux', () => ({
    Actions: {
      replace: jest.fn()
      // whatever other Actions you use in your code
    }
  })
);

jest.mock('react-native-device-info', () => 'react-native-device-info');
jest.mock('@react-native-community/geolocation', () => '@react-native-community/geolocation');
jest.mock('@react-native-community/async-storage', () => 'AsyncStorage');
jest.mock('react-native-location', () => 'RNLocation');
jest.mock('react-native-geolocation-service', () => 'Geolocation');

// jest
//   .mock('WebView', () => 'WebView');
