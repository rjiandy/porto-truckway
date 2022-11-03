import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  scan,
  deliveryIcon,
  pickupIcon,
  bffIcon,
  bonusIcon
} from '../assets/svgIcon';

const svgStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const svgCompile = (source, width, height) => {
  return (
    <View style={svgStyles.container}>
      <SvgXml
        width={width}
        height={height}
        xml={source}
      />
    </View>
  );
};

const getSource = (type, status) => {
  switch (type) {
    case 'scan': {
      return scan;
    }
    case 'deliveryIcon': {
      return deliveryIcon(status);
    }
    case 'pickupIcon': {
      return pickupIcon(status);
    }
    case 'bffIcon': {
      return bffIcon(status);
    }
    case 'buttonIcon': {
      return bonusIcon(status);
    }
    default: {
      return '';
    }
  }
};

export default function CustomIcon(props) {
  const {
    type,
    width,
    height,
    status
  } = props;

  return svgCompile(getSource(type, status), width, height);
}
