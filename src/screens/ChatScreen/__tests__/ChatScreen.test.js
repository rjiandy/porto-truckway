/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ChatScreen from '../ChatScreen';

test('renders correctly', () => {
  const chat = renderer.create(<ChatScreen />).toJSON();
  expect(chat).toMatchSnapshot();
});
