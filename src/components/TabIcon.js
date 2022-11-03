import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  homeIcon,
  chatIcon,
  historyIcon,
  performanceIcon
} from '../assets/svgIcon';

import colors from '../themes/colors';

const svgStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  }
});

const svgCompile = (source, label, tintColor) => {
  let width = 18;
  let height = 18;

  return (
    <View style={svgStyles.container}>
      <SvgXml
        width={width}
        height={height}
        xml={source}
      />
      <View>
        <Text style={[svgStyles.label, { color: tintColor }]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

const TabIcon = (props) => {
  const { name, tintColor } = props;
  let imageSource = null;

  // ACTIVE
  if (tintColor === colors.brightNavyBlue) {
    if (name === 'Beranda') {
      imageSource = homeIcon('ON');
    } else if (name === 'Pesan') {
      imageSource = chatIcon('ON');
    } else if (name === 'Riwayat') {
      imageSource = historyIcon('ON');
    } else if (name === 'Performa') {
      imageSource = performanceIcon('ON');
    }
  } else if (tintColor === colors.davysGrey) {
    // IN ACTIVE
    if (name === 'Beranda') {
      imageSource = homeIcon();
    } else if (name === 'Pesan') {
      imageSource = chatIcon();
    } else if (name === 'Riwayat') {
      imageSource = historyIcon();
    } else if (name === 'Performa') {
      imageSource = performanceIcon();
    }
  }

  return svgCompile(imageSource, name, tintColor);
};

export default TabIcon;
