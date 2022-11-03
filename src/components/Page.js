import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../themes/colors';

import styles from './styles/Page-style';

const Page = (props) => {
  const { style, children, ...others } = props;
  return (
    <View style={[styles.container, style]} {...others}>
      <StatusBar backgroundColor={colors.cultured} barStyle="dark-content" />
      {Platform.OS === 'ios' ? (
        <View style={{ height: 30 }} />
      ) : null}
      {children}
    </View>
  );
};

export default Page;

Page.propTypes = {
  style: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object)
};
