import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import PropTypes from 'prop-types';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import customerIcon from '../../../assets/shop.png';
import doIcon from '../../../assets/do.png';
import itemIcon from '../../../assets/items.png';
import pickupIcon from '../../../assets/pickup.png';

import emptyShipment from '../../../assets/empty.png';
import notFound from '../../../assets/not-found.png';

import {
  Section,
  StyledText,
  Row,
  Icon
} from '../../../components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    padding: 14,
    marginBottom: 10
  },
  shipmentOverall: {
    marginTop: 11,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    paddingTop: 14,
    flexDirection: 'column'
  },
  collapsedIcon: {
    position: 'absolute',
    top: 27,
    right: 14
  },
  rowItem: {
    marginBottom: 12
  },
  rowDetail: {
    width: 120,
    alignItems: 'center'
  },
  detailIcon: {
    width: 12,
    height: 12,
    marginRight: 6
  },
  detailButton: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.brightNavyBlue,
    marginTop: 12
  },
  detailInverseButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12
  },
  emptyImage: {
    width: 120,
    height: 74
  },
  emptyContent: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: 260
  }
});

/*
  props
  - shipmentDetails
    - number
    - customerCount
    - itemTotal
    - total shipment DO
    - total pickup DO
  - onDetailPress
  - isToday
  - isCollapsed
  - POD done??? (Later in the future with a green checkmark)
*/

export default function ShipmentItem(props) {
  const {
    isToday,
    shipmentPlanNumber,
    isCollapsed,
    onDetailPress,
    customerCount,
    itemCount,
    deliveryCount,
    pickupCount,
    shipmentInProgress,
    isButtonLoading
  } = props;

  const [collapsed, setCollapsed] = useState(isCollapsed);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setCollapsed(!collapsed)}
    >
      <Section style={styles.collapsedIcon}>
        <Icon name={collapsed ? 'chevron-up' : 'chevron-down'} style={{ fontSize: 14 }} />
      </Section>
      <StyledText style={fonts['Roboto-12-davysGrey']}>
        Shipment Plan No.
      </StyledText>
      <StyledText style={isToday ? fonts['Roboto-16-blue'] : fonts['Roboto-16-black-bold']}>
        {shipmentPlanNumber}
      </StyledText>
      {
        collapsed && (
          <Section style={styles.shipmentOverall}>

            <Row style={styles.rowItem}>
              <Row style={styles.rowDetail}>
                <Image source={customerIcon} style={styles.detailIcon} />
                <StyledText style={[fonts['Roboto-12-davysGrey']]}>
                  {customerCount} Customer
                </StyledText>
              </Row>
              <Row style={styles.rowDetail}>
                <Image source={doIcon} style={styles.detailIcon} />
                <StyledText style={[fonts['Roboto-12-davysGrey']]}>
                  {deliveryCount} Pengiriman
                </StyledText>
              </Row>
            </Row>

            <Row style={styles.rowItem}>
              <Row style={styles.rowDetail}>
                <Image source={itemIcon} style={styles.detailIcon} />
                <StyledText style={[fonts['Roboto-12-davysGrey']]}>
                  {itemCount} Item
                </StyledText>
              </Row>
              <Row style={styles.rowDetail}>
                <Image source={pickupIcon} style={styles.detailIcon} />
                <StyledText style={[fonts['Roboto-12-davysGrey']]}>
                  {pickupCount} Pengambilan
                </StyledText>
              </Row>
            </Row>
            {
              isToday ? (
                <TouchableOpacity
                  style={[styles.detailButton, (shipmentInProgress || isButtonLoading) && styles.detailInverseButton]}
                  onPress={onDetailPress}
                >
                  {
                    isButtonLoading ? (
                      <ActivityIndicator size="small" color={colors.brightNavyBlue} />
                    ) : shipmentInProgress ? (
                      <StyledText style={fonts['Roboto-14-blue-bold']}>
                        Kerjakan Sekarang
                      </StyledText>
                    ) : (
                      <StyledText style={fonts['Roboto-14-white-bold']}>
                        Kerjakan Sekarang
                      </StyledText>
                    )
                  }
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.detailButton, styles.detailInverseButton]}
                  onPress={onDetailPress}
                >
                  <StyledText style={fonts['Roboto-14-blue-bold']}>
                    Lihat Detail
                  </StyledText>
                </TouchableOpacity>
              )
            }
          </Section>
        )
      }
    </TouchableOpacity>
  );
}

export function ShipmentEmpty() {
  return (
    <Section style={styles.emptyContainer}>
      <Image source={emptyShipment} style={styles.emptyImage} resizeMode="cover" />
      <Section style={styles.emptyContent}>
        <StyledText style={[fonts['Roboto-14-black-bold'], { textAlign: 'center' }]}>
          Tidak Ada Shipment Plan
        </StyledText>
        <StyledText style={[fonts['Roboto-12-davysGrey'], { textAlign: 'center' }]}>
          {/* eslint-disable-next-line max-len */}
          Tunggu beberapa saat dan coba lakukan <StyledText style={{ fontStyle: 'italic' }}>refresh</StyledText> atau hubungi admin untuk info lebih lanjut.
        </StyledText>
      </Section>
    </Section>
  );
}

ShipmentItem.propTypes = {
  isToday: PropTypes.bool,
  shipmentPlanNumber: PropTypes.string,
  isCollapsed: PropTypes.bool,
  onDetailPress: PropTypes.func,
  pickupCount: PropTypes.number,
  shipmentInProgress: PropTypes.bool,
  isButtonLoading: PropTypes.bool
};

export function NotFoundShipment() {
  return (
    <Section style={styles.emptyContainer}>
      <Image source={notFound} style={styles.emptyImage} resizeMode="contain" />
      <Section style={[styles.emptyContent, { width: 163 }]}>
        <StyledText style={fonts['Roboto-14-black-bold']}>
          Maaf
        </StyledText>
        <StyledText style={[fonts['Roboto-12-davysGrey'], { textAlign: 'center' }]}>
          Shipment Plan yang Anda cari tidak dapat ditemukan.
        </StyledText>
      </Section>
    </Section>
  );
}
