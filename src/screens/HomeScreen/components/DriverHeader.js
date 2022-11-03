import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import noAvatar from '../../../assets/no-avatar2.png';

import {
  Section,
  StyledText
} from '../../../components';

const driverHeaderStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 14,
    height: 40,
    marginBottom: 6
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8
  }
});

export default function DriverHeader(props) {
  const { name } = props;
  return (
    <Section style={driverHeaderStyles.container}>
      <Section style={driverHeaderStyles.content}>
        <Image style={driverHeaderStyles.avatar} source={noAvatar} resizeMode="cover" />
        <Section>
          <StyledText style={[fonts['Roboto-10'], { color: colors.grayWeb }]}>
            Nama Driver
          </StyledText>
          <StyledText style={[fonts['Roboto-12-white'], { color: colors.davysGrey }]}>
            {name}
          </StyledText>
        </Section>
      </Section>
    </Section>
  );
}
