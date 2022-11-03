import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import {
  Section,
  StyledText,
  Row
} from '../../../components';

import truckIcon from '../../../assets/icon_truck.png';
import lampImg from '../../../assets/lamp_on.png';
import alertImg from '../../../assets/alert.png';

import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    marginBottom: 10
  },
  headers: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: 'white',
    minHeight: 40
  },
  tabHeader: {
    alignSelf: 'flex-start',
    marginRight: 10
  },
  headerText: {
    fontSize: 14,
    color: colors.davysGrey,
    marginBottom: 8,
    marginHorizontal: 14,
    fontWeight: 'bold'
  },
  bar: {
    height: 2,
    backgroundColor: colors.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  contentStyle: {
    paddingTop: 10
  }
});

function TabGroup(props) {
  const {
    headers,
    itemsCount,
    setActiveIndex,
    activeIndex,
    isPickupEnabled
  } = props;

  return (
    <Section style={[styles.container]}>
      <Section>
        <ScrollView style={styles.headers} horizontal showsHorizontalScrollIndicator={false}>
          {
            headers && headers.map((title, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.tabHeader}
                  onPress={() => setActiveIndex(index)}
                >
                  <StyledText style={[styles.headerText, activeIndex === index && { color: colors.brightNavyBlue }]}>
                    {title}
                  </StyledText>
                  <Section style={[styles.bar, activeIndex === index && { backgroundColor: colors.brightNavyBlue }]} />
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </Section>
      <Row style={{ paddingVertical: 10, paddingLeft: 14 }}>
        <Image
          source={truckIcon}
          style={{
            width: 20,
            height: 20,
            transform: activeIndex === 1 ? [{ rotateY: '180deg' }] : [{ rotateY: '0deg' }]
          }}
          resizeMode="contain"
        />
        <StyledText font="Roboto-16-davysGrey" style={{ paddingLeft: 6 }}>
          Daftar {activeIndex === 1 ? 'Pengambilan' : 'Pengiriman'} ({itemsCount[activeIndex]})
        </StyledText>
      </Row>
      <Row
        style={{
          backgroundColor: activeIndex === 1 && !isPickupEnabled ? colors.maximumRed : colors.starCommandBlue,
          padding: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          borderRadius: 4
        }}
      >
        <Section style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={activeIndex === 0 || (activeIndex === 1 && isPickupEnabled) ? lampImg : alertImg}
            style={{ width: 24, height: 24 }}
            resizeMode="center"
          />
        </Section>
        <Section style={{ flex: 1, paddingLeft: 8 }}>
          {activeIndex === 0 || (activeIndex === 1 && isPickupEnabled) ? (
            <StyledText font="Roboto-12-white">
              <StyledText style={{ fontWeight: 'bold' }}>Geser </StyledText>
              daftar DO
              <StyledText style={{ fontWeight: 'bold' }}> kesamping </StyledText>
              untuk melakukan aksi!
            </StyledText>
          ) : (
            <StyledText font="Roboto-12-white">
              <StyledText style={{ fontWeight: 'bold' }}>Selesaikan proses pengiriman </StyledText>
              terlebih dahulu!
            </StyledText>
          )}
        </Section>
      </Row>
    </Section>
  );
}

TabGroup.defaultProps = {
  headers: []
};

export default TabGroup;
