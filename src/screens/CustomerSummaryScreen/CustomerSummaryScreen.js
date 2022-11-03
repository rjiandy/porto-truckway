import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import placeholderImg from '../../assets/foto_toko_small.png';

import { getCustomerTag } from '../CustomerListScreen/components/CustomerCard';

import customerIcon from '../../assets/shop.png';
import addressIcon from '../../assets/pin_pending.png';
import doIcon from '../../assets/do.png';
import salesmanIcon from '../../assets/icon_bff.png';
import pickupIcon from '../../assets/pickup.png';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

import { saveCustomerVisit } from '../../stores/actions/shipmentPlanAction';

import { deviceHeight } from '../../utils/platform';

import {
  Page,
  Section,
  StyledText,
  Icon,
  Row,
  Body,
  Header,
  CustomIcon
} from '../../components';

const styles = StyleSheet.create({
  customerImageContainer: {
    width: '100%',
    height: 124
  },
  customerImage: {
    width: '100%',
    height: 124
  },
  body: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    marginTop: 14,
    paddingHorizontal: 14,
    flexDirection: 'column'
  },
  buttonSection: {
    marginTop: 14,
    flexDirection: 'column'
  },
  primaryButtonWrapper: {
    borderTopWidth: 10,
    borderColor: colors.cultured,
    marginTop: 10
  },
  button: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    height: 40,
    marginBottom: 20,
    marginHorizontal: 14
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    flex: 1
  },
  bottomOverlay: {
    position: 'absolute',
    flexDirection: 'column',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 500,
    justifyContent: 'flex-end'
  },
  bottomModalContent: {
    padding: 14,
    backgroundColor: 'white',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    flexDirection: 'column'
  },
  bottomContent: {
    flexDirection: 'column',
    marginBottom: 14,
    alignItems: 'center'
  },
  visitedButton: {
    borderColor: colors.brightNavyBlue,
    backgroundColor: colors.white,
    borderWidth: 1
  },
  disabledButton: {
    borderColor: colors.silver,
    backgroundColor: colors.white,
    borderWidth: 1
  },
  disabledText: {
    color: colors.silver
  }
});

export function CustomerSummaryScreen(props) {

  const { customerData, startVisit, isNextShipment, saveVisit } = props;
  const {
    customerName,
    customerID,
    distChannel,
    streetName,
    city,
    salesman,
    doCount,
    pickupCount,
    salesmanPhone,
    customerPhone,
    customerPhoto,
    isCOD,
    isCBD,
    isRedelivery,
    isReschedule,
    isPickup,
    isVisited,
    firstDeliveryId,
    shipmentId,
    isCustPhoneAvail,
    isSalesPhoneAvail
  } = customerData;

  const [driverId, setDriverId] = useState('');
  const [displayImage, setDisplayImage] = useState(false);
  const [displayContact, setDisplayContact] = useState(false);
  const [contactMethod, setContactMethod] = useState(''); // call or text

  useEffect(() => {
    AsyncStorage.getItem('@driverId').then(driverID => setDriverId(driverID));
  }, []);

  const onVisitPress = () => {
    const payload = {
      driver_id: driverId,
      customer_id: customerID,
      do_id: firstDeliveryId,
      shipment_plan_number: shipmentId
    };
    startVisit(customerID);
    saveVisit(payload);
    Actions.customerDetailScreen();
  };

  return (
    <Page style={{ flex: 1, flexDirection: 'column' }}>
      {
        displayImage && (
          <TouchableOpacity style={styles.overlay} onPress={() => setDisplayImage(false)}>
            <Image
              source={customerPhoto ? { uri: customerPhoto } : placeholderImg}
              resizeMode="contain"
              style={{ width: '100%' }}
            />
          </TouchableOpacity>
        )
      }

      {
        displayContact && (
          <Section style={styles.bottomOverlay}>
            <Section style={styles.bottomModalContent}>
              <TouchableOpacity
                onPress={() => {
                  setContactMethod('');
                  setDisplayContact(false);
                }}
              >
                <Icon name="md-close" style={{ marginBottom: 4, color: colors.davysGrey, fontSize: 14 }} />
              </TouchableOpacity>
              <Section style={styles.bottomContent}>
                <StyledText style={fonts['Roboto-14-black-bold']}>
                  {contactMethod === 'call' ? 'Hubungi' : 'Kirim Pesan'}
                </StyledText>
                <TouchableOpacity
                  onPress={() => {
                    if (contactMethod === 'call') {
                      Linking.openURL(`tel:+${customerPhone}`);
                    } else {
                      Linking.openURL(`sms:+${customerPhone}`);
                    }
                  }}
                  disabled={!isCustPhoneAvail}
                  style={[styles.button, { flex: 0, width: '100%', marginVertical: 10 }, !isCustPhoneAvail && styles.disabledButton]}
                >
                  <Icon
                    name="md-person"
                    style={{
                      color: isCustPhoneAvail ? colors.brightNavyBlue : colors.silver,
                      marginRight: 4,
                      fontSize: 12,
                      marginLeft: 8
                    }}
                  />
                  <Section style={{ flex: 1 }}>
                    <StyledText style={[fonts['Roboto-14-blue-bold'], !isCustPhoneAvail && styles.disabledText]}>
                      Customer, {customerName}
                    </StyledText>
                  </Section>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (contactMethod === 'call') {
                      Linking.openURL(`tel:+${salesmanPhone}`);
                    } else {
                      Linking.openURL(`sms:+${salesmanPhone}`);
                    }
                  }}
                  disabled={!isSalesPhoneAvail}
                  style={[
                    styles.button,
                    {
                      flex: 0,
                      width: '100%'
                    },
                    !isSalesPhoneAvail && styles.disabledButton
                  ]}
                >
                  <Section style={{ paddingRight: 4, paddingLeft: 8 }}>
                    <CustomIcon
                      status={isSalesPhoneAvail ? 'ON' : 'OFF'}
                      type="bffIcon"
                      height={16}
                      width={16}
                    />
                  </Section>
                  <Section style={{ flex: 1 }}>
                    <StyledText
                      style={[
                        fonts['Roboto-14-blue-bold'],
                        !isSalesPhoneAvail && styles.disabledText
                      ]}
                    >
                      Sales, {salesman}
                    </StyledText>
                  </Section>
                </TouchableOpacity>
              </Section>
            </Section>
          </Section>
        )
      }

      <Header title="Ringkasan Toko" />
      <Body style={styles.body} contentContainerStyle={{ flex: deviceHeight > 600 ? 1 : 0 }}>
        <TouchableOpacity
          style={styles.customerImageContainer}
          onPress={() => setDisplayImage(true)}
        >
          <Image
            style={styles.customerImage}
            resizeMode="cover"
            source={customerPhoto ? { uri: customerPhoto } : placeholderImg}
          />
        </TouchableOpacity>
        <Section style={styles.mainContent}>
          <Row style={{ marginBottom: 4, flexWrap: 'wrap' }}>
            {isRedelivery && getCustomerTag(isRedelivery && 'Redelivery')}
            {isReschedule && getCustomerTag(isReschedule && 'Reschedule')}
            {isCOD && getCustomerTag(isCOD && 'COD')}
            {isCBD && getCustomerTag(isCBD && 'CBD')}
            {isPickup && getCustomerTag(isPickup && 'Pickup')}
          </Row>
          <StyledText style={[fonts['Roboto-16-black-bold'], { marginBottom: 8 }]}>
            {customerName}
          </StyledText>
          <Row style={{ marginBottom: 10 }}>
            <Row>
              <Section style={{ width: 20 }}>
                <Icon
                  name="md-person"
                  style={{ fontSize: 12, color: colors.davysGrey }}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                ID Pelanggan
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText
              style={[
                fonts['Roboto-12-davysGrey'],
                { flex: 1, flexWrap: 'wrap' }
              ]}
            >
              {customerID}
            </StyledText>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Row>
              <Section style={{ width: 20 }}>
                <Image
                  style={{ width: 12, height: 10, marginTop: 2 }}
                  source={customerIcon}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                Saluran
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText
              style={[
                fonts['Roboto-12-davysGrey'],
                { flex: 1, flexWrap: 'wrap' }
              ]}
            >
              {distChannel}
            </StyledText>
          </Row>
          <Row>
            <Row>
              <Section style={{ width: 20 }}>
                <Image
                  style={{ width: 8, height: 12 }}
                  source={addressIcon}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                Alamat
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText
              style={[
                fonts['Roboto-12-davysGrey'],
                { flex: 1, flexWrap: 'wrap' }
              ]}
            >
              {streetName}
            </StyledText>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Section style={{ width: 125 }} />
            <StyledText
              style={[
                fonts['Roboto-12-davysGrey'],
                { flex: 1, flexWrap: 'wrap' }
              ]}
            >
              {city}
            </StyledText>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Row>
              <Section style={{ width: 20 }}>
                <Image
                  style={{ width: 11, height: 13 }}
                  source={salesmanIcon}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                Salesman
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {salesman}
            </StyledText>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Row>
              <Section style={{ width: 20 }}>
                <Image
                  style={{ width: 12, height: 10 }}
                  source={doIcon}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                Pengiriman
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {doCount} Item
            </StyledText>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Row>
              <Section style={{ width: 20 }}>
                <Image
                  style={{ width: 12, height: 10 }}
                  source={pickupIcon}
                />
              </Section>
              <StyledText style={[fonts['Roboto-12-davysGrey'], { width: 100 }]}>
                Pengambilan
              </StyledText>
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {': '}
              </StyledText>
            </Row>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {pickupCount} Item
            </StyledText>
          </Row>
        </Section>

        <Section style={styles.buttonSection}>
          <Section style={{ flexDirection: 'column' }}>
            <Row style={{ marginHorizontal: 14 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setDisplayContact(true);
                  setContactMethod('call');
                }}
              >
                <Icon name="md-call" style={{ color: colors.brightNavyBlue, marginRight: 4, fontSize: 12 }} />
                <StyledText style={fonts['Roboto-14-blue-bold']}>Hubungi</StyledText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginLeft: 16 }]}
                onPress={() => {
                  setDisplayContact(true);
                  setContactMethod('text');
                }}
              >
                <Icon name="md-mail" style={{ color: colors.brightNavyBlue, marginRight: 4, fontSize: 12 }} />
                <StyledText style={fonts['Roboto-14-blue-bold']}>Pesan</StyledText>
              </TouchableOpacity>
            </Row>
            <Row style={{ marginTop: 16, marginHorizontal: 14 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Actions.navigationMapScreen()}
              >
                <Icon name="md-compass" style={{ color: colors.brightNavyBlue, marginRight: 4, fontSize: 12 }} />
                <StyledText style={fonts['Roboto-14-blue-bold']}>Petunjuk Jalan</StyledText>
              </TouchableOpacity>
            </Row>
            <Section style={styles.primaryButtonWrapper}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  (isVisited) && styles.visitedButton,
                  isNextShipment && styles.disabledButton
                ]}
                onPress={() => onVisitPress()}
                disabled={isNextShipment && true}
              >
                {
                  isVisited || isNextShipment ? (
                    <StyledText style={[fonts['Roboto-14-blue-bold'], isNextShipment && { color: colors.silver }]}>
                      Lanjutkan
                    </StyledText>
                  ) : (
                    <StyledText style={fonts['Roboto-14-white-bold']}>
                      Tiba di Toko
                    </StyledText>
                  )
                }
              </TouchableOpacity>
            </Section>
          </Section>
        </Section>
      </Body>
    </Page>
  );
}

export function mapStateToProps(state) {
  const { customerListStore, shipmentPlanStore } = state;
  const { activeCustomer } = customerListStore;

  const isCOD = activeCustomer.payment_types.filter((type) => type === 'COD').length > 0;
  const isCBD = activeCustomer.payment_types.filter((type) => type === 'CBD').length > 0;

  const regex = new RegExp(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/);
  const isCustPhoneAvail = regex.test(activeCustomer.customer_phone);
  const isSalesPhoneAvail = regex.test(activeCustomer.sales_phone);

  const isNextShipment = shipmentPlanStore.nextShipments.shipments.filter(({ shipment_plan_number }) => {
    return shipment_plan_number === shipmentPlanStore.selectedShipment;
  });

  const formattedCustomerData = {
    customerName: activeCustomer.shiptoparty_name,
    customerID: activeCustomer.shiptoparty_code,
    distChannel: activeCustomer.distribution_channel,
    streetName: activeCustomer.street,
    city: activeCustomer.city,
    salesman: activeCustomer.sales_name,
    doCount: activeCustomer.delivery_count,
    pickupCount: activeCustomer.pickup_count,
    salesmanPhone: activeCustomer.sales_phone,
    customerPhone: activeCustomer.customer_phone,
    customerPhoto: activeCustomer.customer_photo,
    isCustPhoneAvail,
    isSalesPhoneAvail,
    isCOD,
    isCBD,
    isRedelivery: activeCustomer.redelivery_count > 0,
    isReschedule: activeCustomer.reschedule_count > 0,
    isPickup: activeCustomer.pickup_count > 0,
    isVisited: activeCustomer.is_visited,
    firstDeliveryId: activeCustomer.deliveries.length > 0 ? activeCustomer.deliveries[0].do_no : '',
    shipmentId: shipmentPlanStore.selectedShipment
  };

  return {
    customerData: formattedCustomerData,
    isNextShipment: isNextShipment.length > 0
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    startVisit: (customerId) => dispatch({
      type: 'START_VISIT',
      customerId
    }),
    saveVisit: (payload) => dispatch(saveCustomerVisit(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSummaryScreen);
