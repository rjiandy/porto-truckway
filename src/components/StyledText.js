import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import fonts from '../themes/fonts';

import styles from './styles/StyledText-style';

const StyledText = (props) => {
  const { font, style, ...others } = props;
  const fontStyle = fonts[font];
  return <Text style={[fontStyle, styles.container, style]} {...others} />;
};

export default StyledText;

StyledText.propTypes = {
  font: PropTypes.string,
  style: PropTypes.instanceOf(Object)
};
