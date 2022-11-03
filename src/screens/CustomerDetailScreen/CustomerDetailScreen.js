import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  Body,
  Col,
  Divider,
  Header,
  Icon,
  Page,
  PrimaryButton,
  Row,
  Section,
  StyledText,
  CustomIcon,
  SecondaryButton
} from '../../components';
import { getCustomerTag } from '../CustomerListScreen/components/CustomerCard';

import { getFinalPriceAction } from '../../stores/actions/shipmentPlanAction';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';


import addressIcon from '../../assets/pin_pending.png';
import salesmanIcon from '../../assets/icon_bff.png';
import AddPhotonImg from '../../assets/icon_add_photo.png';
import RedeliveryDone from '../../assets/redelivery.png';
import ErrorSubmit from '../../assets/wrong_account.png';

import { submitDoAction } from '../../stores/actions/shipmentPlanAction';
import getCurrentLocation from '../../utils/getCurrentLocation';

import DeliveryCard from './components/DeliveryCard';
import TabGroup from './components/TabGroup';
import ReasonDropdown from './components/ReasonDropdown';

import styles from './CustomerDetailScreen-style';

export function CustomerHeader(props) {
  const { customerData, onContactPress } = props;
  return (
    <Section style={styles.container}>
      <Row style={{ flexWrap: 'wrap', paddingTop: 14 }}>
        {customerData.isRedelivery && getCustomerTag(customerData.isRedelivery && 'Redelivery')}
        {customerData.isReschedule && getCustomerTag(customerData.isReschedule && 'Reschedule')}
        {customerData.isCOD && getCustomerTag(customerData.isCOD && 'COD')}
        {customerData.isCBD && getCustomerTag(customerData.isCBD && 'CBD')}
        {customerData.isPickup && getCustomerTag(customerData.isPickup && 'Pickup')}
      </Row>
      <Section>
        <StyledText style={[fonts['Roboto-16-black-bold'], { marginBottom: 8 }]}>
          {customerData.customerName}
        </StyledText>
      </Section>

      <Section style={{ paddingTop: 10 }}>
        <Row style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Section style={{ flex: 0.1 }}>
            <Icon
              name="md-person"
              style={{ fontSize: 12, color: colors.davysGrey }}
            />
          </Section>
          <Section style={{ flex: 0.5 }}>
            <StyledText style={[fonts['Roboto-12-davysGrey']]}>
              ID Pelanggan
            </StyledText>
          </Section>
          <Section style={{ flex: 0.05 }}>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {': '}
            </StyledText>
          </Section>
          <Section style={{ flex: 1 }}>
            <StyledText
              style={[
                fonts['Roboto-12-davysGrey'],
                { flex: 1, flexWrap: 'wrap' }
              ]}
            >
              {customerData.customerID}
            </StyledText>
          </Section>
        </Row>
      </Section>

      <Section style={{ paddingTop: 10 }}>
        <Row style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Section style={{ flex: 0.1 }}>
            <Image
              style={{ width: 8, height: 12 }}
              source={addressIcon}
            />
          </Section>
          <Section style={{ flex: 0.5 }}>
            <StyledText style={[fonts['Roboto-12-davysGrey']]}>
              Alamat
            </StyledText>
          </Section>
          <Section style={{ flex: 0.05 }}>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {': '}
            </StyledText>
          </Section>
          <Section style={{ flex: 1 }}>
            <StyledText font="Roboto-12-davysGrey" style={{ lineHeight: 16 }}>
              {customerData.streetName}
              {'\n'}
              {customerData.city}
            </StyledText>
          </Section>
        </Row>
      </Section>

      <Section style={{ paddingTop: 10 }}>
        <Row style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Section style={{ flex: 0.1 }}>
            <Image
              style={{ width: 11, height: 13 }}
              source={salesmanIcon}
            />
          </Section>
          <Section style={{ flex: 0.5 }}>
            <StyledText style={[fonts['Roboto-12-davysGrey']]}>
              Salesman
            </StyledText>
          </Section>
          <Section style={{ flex: 0.05 }}>
            <StyledText style={fonts['Roboto-12-davysGrey']}>
              {': '}
            </StyledText>
          </Section>
          <Section style={{ flex: 1 }}>
            <StyledText font="Roboto-12-davysGrey" style={{ lineHeight: 16 }}>
              {customerData.salesman}
            </StyledText>
          </Section>
        </Row>
      </Section>

      <Row style={{ justifyContent: 'center', paddingTop: 14 }}>
        <Section style={{ flex: 1, paddingRight: 8 }}>
          <TouchableOpacity
            style={styles.inverseButton}
            onPress={() => {
              onContactPress('call');
            }}
          >
            <Row style={{ alignItems: 'center' }}>
              <Icon name="md-call" size={16} color={colors.brightNavyBlue} />
              <StyledText font="Roboto-14-blue-bold" style={{ paddingLeft: 6 }}>Hubungi</StyledText>
            </Row>
          </TouchableOpacity>
        </Section>

        <Section style={{ flex: 1, paddingLeft: 8 }}>
          <TouchableOpacity
            style={styles.inverseButton}
            onPress={() => {
              onContactPress('text');
            }}
          >
            <Row style={{ alignItems: 'center' }}>
              <Icon name="md-mail" size={16} color={colors.brightNavyBlue} />
              <StyledText font="Roboto-14-blue-bold" style={{ paddingLeft: 6 }}>Pesan</StyledText>
            </Row>
          </TouchableOpacity>
        </Section>
      </Row>
    </Section>
  );
}

export function CustomerDetailScreen(props) {
  const {
    customerData,
    doList,
    reasons,
    setDoStatus,
    setToRedelivery,
    selectDO,
    setDocSJ,
    submitDO,
    activeCustomer,
    errorSubmit,
    isSuccessSubmit,
    resetSubmitStatus,
    currentTab,
    setCurrentTab,
    getFinalPrice,
    isLoadingPrice,
    setShipmentStatus,
    isPickupEnabled
  } = props;

  const { isDeliverySJCompleted, isPickupSJCompleted } = customerData;

  const [isDocDeliveryComplete, setIsDocDeliveryComplete] = useState(isDeliverySJCompleted);
  const [isDocPickupComplete, setIsDocPickupComplete] = useState(isPickupSJCompleted);
  const [isDeliveryPending, setIsDeliveryPending] = useState(false);
  const [isPickupPending, setIsPickupPending] = useState(false);

  const [displayContact, setDisplayContact] = useState(false);
  const [contactMethod, setContactMethod] = useState(''); // call or text
  const [deliveryList, setDeliveryList] = useState([]);
  const [pickupList, setPickupList] = useState([]);

  const [isFailedModal, setFailedModal] = useState(false);
  const [isReasonShown, setReasonShown] = useState(false);

  const [activeDo, setActiveDo] = useState('');

  const [selectedReason, setSelectedReason] = useState(null);
  const [isRedeliveryShown, setRedeliveryShown] = useState(false);
  const [isRedelivery, setRedeliveryStatus] = useState(false);

  const [redeliveryDone, setRedeliveryDone] = useState(false);
  // const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let pickup = [];
    let delivery = [];

    if (doList.length > 0) {
      doList.forEach((item) => {
        if (item.is_pickup === 1) {
          pickup.push(item);
        } else {
          delivery.push(item);
        }
      });
      setDeliveryList(delivery);
      setPickupList(pickup);
    }
  }, [doList]);

  useEffect(() => {
    const [
      deliveryPending,
      pickupPending
    ] = [
      deliveryList.filter(data => data.do_status === 'PENDING').length > 0,
      pickupList.filter(data => data.do_status === 'PENDING').length > 0
    ];

    setIsDeliveryPending(deliveryPending);
    setIsPickupPending(pickupPending);
  }, [deliveryList, pickupList]);

  const onSetFailed = (doNumber) => {
    setActiveDo(doNumber);
    setFailedModal(true);
  };

  const onSetSuccess = (doNumber) => {
    setActiveDo(doNumber);
    setDoStatus(doNumber, 'SUCCESS');
  };

  const onFailedModalSave = () => {
    setFailedModal(false);
    setDoStatus(activeDo, 'FAILED', selectedReason.reason_id);
    setSelectedReason('');
  };

  const onRedeliverySave = () => {
    setToRedelivery(selectedReason.reason_id, currentTab === 1);
    setSelectedReason('');
    setRedeliveryShown(false);
    onDocSJPress(false);
    setRedeliveryStatus(true);
  };

  const onDocSJPress = (status) => {
    if (currentTab === 1) {
      setIsDocPickupComplete(status);
    } else {
      setIsDocDeliveryComplete(status);
    }

    setDocSJ(status, currentTab === 1);
  };

  const onHandleNextPage = async () => {
    if (currentTab === 1 && isPickupEnabled && !isRedelivery) {
      Actions.summaryScreen();
    }
    else {
      let [latitude, longitude] = ['', ''];
      try {
        const latestLocation = await getCurrentLocation();
        if (latestLocation && latestLocation.coords) {
          const { latitude: latTemp, longitude: longTemp } = latestLocation.coords;
          latitude = latTemp.toString();
          longitude = longTemp.toString();
        }
      } catch (err) {
        alert('Gagal mendapatkan lokasi GPS', err.message);
      }

      const newDeliveries = [...deliveryList];
      const newPickup = [...pickupList];
      // FILTER DO PICKUP HERE
      if (currentTab === 0) {
        const isRedeliveryTemp = newDeliveries.find(data => data.is_redelivery);
        const isFailed = newDeliveries.filter(delivery => delivery.do_status === 'FAILED').length === deliveryList.length;
        const shipmentStatus = isRedeliveryTemp ? 'REDELIVERY' : 'PENDING';
        if (isRedeliveryTemp) {
          const newCustomerData = {
            ...activeCustomer,
            submission_date: new Date(),
            shipment_status_customer: {
              ...activeCustomer.shipment_status_customer,
              delivery: shipmentStatus
            },
            deliveries: newDeliveries
          };
          setShipmentStatus(newCustomerData);
          setRedeliveryDone(true);
          submitDO('', {
            ...newCustomerData,
            driver_submit_location: {
              latitude,
              longitude
            }
          });
        } else {
          let payload = {
            ...activeCustomer,
            submission_date: new Date()
          };
          if (!isFailed) {
            await getFinalPrice(payload);
          }
          Actions.CODTransactionScreen();
        }
      } else if (currentTab === 1) {
        const isRescheduledTemp = newPickup.find(data => data.is_reschedule);
        const isFailed = newPickup.filter(delivery => delivery.do_status === 'FAILED').length === pickupList.length;
        const shipmentStatus = isRescheduledTemp ? 'RESCHEDULED' : 'PENDING';
        if (isRescheduledTemp) {
          const newCustomerData = {
            ...activeCustomer,
            submission_date: new Date(),
            shipment_status_customer: {
              ...activeCustomer.shipment_status_customer,
              pickup: shipmentStatus
            },
            deliveries: newPickup
          };
          setShipmentStatus(newCustomerData);
          setRedeliveryDone(true);
          submitDO('', {
            ...newCustomerData,
            driver_submit_location: {
              latitude,
              longitude
            }
          });
        } else {
          let payload = {
            ...activeCustomer,
            submission_date: new Date()
          };
          if (!isFailed) {
            await getFinalPrice(payload);
          }
          Actions.CODTransactionScreen();
        }
      }
    }
  };

  const onSuccesSubmit = () => {
    if (pickupList.length > 0) {
      setCurrentTab(1);
    } else {
      Actions.popTo('customerListScreen');
    }
    resetSubmitStatus();
  };

  const isDisableNextPage = currentTab === 0 ? customerData.doCount === 0 || isDeliveryPending : customerData.pickupCount === 0 || isPickupPending;

  return (
    <Page>
      {/* {
        isLoading && (
          <Section style={[styles.overlay2, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={colors.brightNavyBlue} />
          </Section>
        )
      } */}
      <Header title="Detail Toko" />
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
                      Linking.openURL(`tel:+${customerData.customerPhone}`);
                    } else {
                      Linking.openURL(`sms:+${customerData.customerPhone}`);
                    }
                  }}
                  style={[
                    styles.button,
                    {
                      flex: 0,
                      width: '100%',
                      marginVertical: 10
                    },
                    !customerData.isCustPhoneAvail && styles.disabledButton
                  ]}
                  disabled={!customerData.isCustPhoneAvail}
                >
                  <Icon
                    name="md-person"
                    style={{
                      color: customerData.isCustPhoneAvail ? colors.brightNavyBlue : colors.silver,
                      marginRight: 4,
                      fontSize: 12,
                      marginLeft: 8
                    }}
                  />
                  <Section style={{ flex: 1 }}>
                    <StyledText
                      style={[
                        fonts['Roboto-14-blue-bold'],
                        !customerData.isCustPhoneAvail && styles.disabledText
                      ]}>
                      Customer, {customerData.customerName}
                    </StyledText>
                  </Section>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (contactMethod === 'call') {
                      Linking.openURL(`tel:+${customerData.salesmanPhone}`);
                    } else {
                      Linking.openURL(`sms:+${customerData.salesmanPhone}`);
                    }
                  }}
                  style={[
                    styles.button,
                    {
                      flex: 0,
                      width: '100%'
                    },
                    !customerData.isSalesPhoneAvail && styles.disabledButton
                  ]}
                  disabled={!customerData.isSalesPhoneAvail}
                >
                  <Section style={{ paddingRight: 4, paddingLeft: 8 }}>
                    <CustomIcon
                      status={customerData.isSalesPhoneAvail ? 'ON' : 'OFF'}
                      type="bffIcon"
                      height={16}
                      width={16}
                    />
                  </Section>
                  <Section style={{ flex: 1 }}>
                    <StyledText
                      style={[
                        fonts['Roboto-14-blue-bold'],
                        !customerData.isSalesPhoneAvail && styles.disabledText
                      ]}
                    >
                      Sales, {customerData.salesman}
                    </StyledText>
                  </Section>
                </TouchableOpacity>
              </Section>
            </Section>
          </Section>
        )
      }
      {
        isFailedModal && (
          <Section style={styles.overlay}>
            <Section style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  setFailedModal(false);
                  setSelectedReason('');
                }}
                style={{ marginBottom: 10 }}
              >
                <Icon
                  name="md-close"
                  color={colors.spanishGray}
                  size={24}
                />
              </TouchableOpacity>
              <StyledText style={fonts['Roboto-14-black']}>
                Alasan Penolakan
              </StyledText>
              <ReasonDropdown
                label={selectedReason ? selectedReason.description : ''}
                onPress={() => {
                  setReasonShown(true);
                }}
              />
              <Section style={styles.photoSection}>
                <StyledText>
                  Bukti foto (opsi pilihan)
                </StyledText>
                <TouchableOpacity style={styles.iconButton} onPress={() => alert('Not Implemented Yet')}>
                  <StyledText style={fonts['Roboto-14-blue-bold']}>Unggah Foto</StyledText>
                  <Image source={AddPhotonImg} style={styles.img} />
                </TouchableOpacity>
              </Section>
              <Section style={styles.buttonSection}>
                <PrimaryButton
                  label="Simpan Alasan"
                  customStyles={{ marginBottom: 14 }}
                  onPress={() => onFailedModalSave()}
                  disabled={selectedReason ? false : true}
                />
                <SecondaryButton
                  label="Batal"
                  onPress={() => {
                    setFailedModal(false);
                    setSelectedReason('');
                  }}
                />
              </Section>
            </Section>
          </Section>
        )
      }
      {
        isRedeliveryShown && (
          <Section style={styles.bottomOverlay}>
            <Section style={styles.bottomModalContent}>
              <TouchableOpacity
                onPress={() => {
                  setRedeliveryShown(false);
                }}
              >
                <Icon name="md-close" style={{ marginBottom: 4, color: colors.davysGrey }} size={24} />
              </TouchableOpacity>
              <StyledText style={[fonts['Roboto-14-davysGrey'], { alignSelf: 'center' }]}>
                {currentTab === 0 ? 'Batalkan dan Kirim Lain Hari' : 'Batalkan dan Ambil Lain Hari'}
              </StyledText>
              <ReasonDropdown
                isRedelivery={currentTab === 0}
                isReschedule={currentTab === 1}
                label={selectedReason ? selectedReason.description : ''}
                onPress={() => {
                  setReasonShown(true);
                }}
              />
              <Section style={styles.buttonSection}>
                <PrimaryButton
                  label="Simpan Alasan"
                  customStyles={{ marginBottom: 14 }}
                  onPress={() => onRedeliverySave()}
                  disabled={selectedReason ? false : true}
                />
                <SecondaryButton
                  label="Batal"
                  onPress={() => setRedeliveryShown(false)}
                />
              </Section>
            </Section>
          </Section>
        )
      }
      {
        redeliveryDone && (
          <Section style={[styles.overlay2, { justifyContent: 'center', alignItems: 'center' }]}>
            <Section style={styles.modalCenterContent}>
              <Image source={RedeliveryDone} style={{ width: 200, height: 160, marginBottom: 14, alignSelf: 'center' }} />
              <StyledText style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}>Selesai!</StyledText>
              <StyledText style={{ textAlign: 'center', ...fonts['Roboto-14-davysGrey'] }}>
                Pengiriman akan dijadwalkan kembali ke lain waktu.
              </StyledText>
              <PrimaryButton
                label="OK!"
                customStyles={{ marginTop: 14 }}
                onPress={() => {
                  setRedeliveryDone(false);
                  Actions.popTo('customerListScreen');
                }}
              />
            </Section>
          </Section>
        )
      }
      {
        isSuccessSubmit && (
          <Section style={styles.overlay2}>
            <Section style={styles.modalContainer}>
              <Image source={RedeliveryDone} style={{ width: 202, height: 162, marginTop: 40, marginBottom: 14, alignSelf: 'center' }} />
              <StyledText style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}>Selesai!</StyledText>
              <StyledText style={{ marginHorizontal: 16.5, textAlign: 'center', ...fonts['Roboto-14-davysGrey'] }}>
                Pengiriman telah selesai!
              </StyledText>
              <PrimaryButton label="OK!" customStyles={{ marginHorizontal: 16.5, marginVertical: 24 }} onPress={() => onSuccesSubmit()} />
            </Section>
          </Section>
        )
      }
      {
        errorSubmit && (
          <Section style={styles.overlay2}>
            <Section style={styles.modalContainer}>
              <Image source={ErrorSubmit} style={{ width: 202, height: 162, marginTop: 40, marginBottom: 14, alignSelf: 'center' }} />
              <StyledText style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}>Maaf!</StyledText>
              <StyledText style={{ marginHorizontal: 55.5, textAlign: 'center', ...fonts['Roboto-14-davysGrey'] }}>
                Terjadi kesalahan, mohon ulangi beberapa saat lagi.
              </StyledText>
              <PrimaryButton label="OK!" customStyles={{ marginHorizontal: 16.5, marginVertical: 26 }} onPress={() => resetSubmitStatus()} />
            </Section>
          </Section>
        )
      }
      {
        isReasonShown && (
          <Section style={[styles.overlay2, { justifyContent: 'center', alignItems: 'center' }]}>
            <Section style={styles.reasonsContainer}>
              <ScrollView>
                {
                  reasons.map((reasonData, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.reasonChoice}
                      onPress={() => {
                        setSelectedReason(reasonData);
                        setReasonShown(false);
                      }}
                    >
                      <StyledText
                        style={[
                          fonts['Roboto-14-black-bold'],
                          reasonData.reason_id === (selectedReason ? selectedReason.reason_id : '') && { color: colors.brightNavyBlue }
                        ]}
                      >
                        {reasonData.description}
                      </StyledText>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </Section>

          </Section>
        )
      }
      <CustomerHeader
        customerData={customerData}
        onContactPress={(method) => {
          setDisplayContact(true);
          setContactMethod(method);
        }}
      />

      <Body style={{ backgroundColor: colors.white }}>
        <TabGroup
          setActiveIndex={(index) => setCurrentTab(index)}
          itemsCount={[customerData.doCount, customerData.pickupCount]}
          headers={['Pengiriman', 'Pengambilan']}
          activeIndex={currentTab}
          isPickupEnabled={isPickupEnabled}
        />
        {
          currentTab === 0 && (
            deliveryList.map((data, key) => (
              <DeliveryCard
                key={key}
                currentTab={currentTab}
                doData={data}
                onFailedSwipe={() => onSetFailed(data.do_no)}
                onSuccessSwipe={() => onSetSuccess(data.do_no)}
                enableSwipe={currentTab === 0}
                selectDO={selectDO}
              />
            ))
          )
        }
        {
          currentTab === 1 && (
            pickupList.map((data, key) => (
              <DeliveryCard
                key={key}
                currentTab={currentTab}
                doData={data}
                onFailedSwipe={() => onSetFailed(data.do_no)}
                onSuccessSwipe={() => onSetSuccess(data.do_no)}
                enableSwipe={currentTab === 1 && isPickupEnabled}
                selectDO={selectDO}
              />
            ))
          )
        }

        <Section style={{ paddingHorizontal: 14, backgroundColor: colors.white }}>
          <Divider style={{ backgroundColor: colors.lightGray }} />
          <Section style={{ paddingVertical: 14 }}>
            <Row style={{ alignItems: 'center' }}>
              <Icon name="md-document" color={colors.cyanProcess} size={20} />
              <Col style={{ flex: 1, paddingLeft: 10 }}>
                <StyledText font="Roboto-14-davysGrey">
                  Kelengkapan Dokumen
                </StyledText>
                <StyledText font="Roboto-12-dimGray">
                  Centang jika dokumen pesan antar lengkap.
                </StyledText>
              </Col>
              <Col style={{ flex: 0.2, alignItems: 'flex-end' }}>
                {currentTab === 0 ? (
                  <TouchableOpacity
                    onPress={() => onDocSJPress(!isDocDeliveryComplete)}
                    disabled={customerData.isRedeliveryDO}
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: isDocDeliveryComplete ? colors.mountainMeadow : colors.gainsboro,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {isDocDeliveryComplete && <Icon name="md-checkmark" color={colors.white} size={20} />}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => onDocSJPress(!isDocPickupComplete)}
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: isDocPickupComplete ? colors.mountainMeadow : colors.gainsboro,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {isDocPickupComplete && <Icon name="md-checkmark" color={colors.white} size={20} />}
                  </TouchableOpacity>
                )}
              </Col>
            </Row>
          </Section>
          <Divider style={{ backgroundColor: colors.lightGray }} />
          <Section style={{ paddingVertical: 14 }}>
            <Col style={{ paddingBottom: 14 }}>
              <PrimaryButton
                disabled={isDisableNextPage || isLoadingPrice}
                label="Simpan dan Lanjutkan"
                onPress={onHandleNextPage}
                isLoading={isLoadingPrice}
              />
            </Col>
            <Col>
              <PrimaryButton
                label={currentTab === 0 ? 'Redelivery' : 'Reschedule'}
                invert
                disabled={
                  (currentTab === 1 && customerData.pickupCount === 0) ||
                  (currentTab === 0 && customerData.doCount === 0) ||
                  (currentTab === 1 && !isPickupEnabled) ||
                  isLoadingPrice
                }
                onPress={() => {
                  setRedeliveryShown(true);
                }}
              />
            </Col>
          </Section>
        </Section>
      </Body>
    </Page>
  );
}

export function mapStateToProps(state) {
  const { customerListStore, shipmentPlanStore } = state;
  const { activeCustomer, isLoadingPrice } = customerListStore;
  const { delivery } = activeCustomer.shipment_status_customer;

  const isCOD = activeCustomer.payment_types.filter((type) => type === 'COD').length > 0;
  const isCBD = activeCustomer.payment_types.filter((type) => type === 'CBD').length > 0;

  const regex = new RegExp(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/);
  const isCustPhoneAvail = regex.test(activeCustomer.customer_phone);
  const isSalesPhoneAvail = regex.test(activeCustomer.sales_phone);

  const isDeliverySJCompleted = (activeCustomer.deliveries
    .filter(doData => !doData.is_pickup)
    .findIndex(processedDoData => processedDoData.doc_sj_kembali)) >= 0;

  const isPickupSJCompleted = (activeCustomer.deliveries
    .filter(doData => doData.is_pickup)
    .findIndex(processedDoData => processedDoData.doc_sj_kembali)) >= 0;

  const isRedeliveryDO = (activeCustomer.deliveries.filter(doData => doData.is_redelivery).length) > 0;

  const formattedCustomerData = {
    customerName: activeCustomer.shiptoparty_name,
    customerID: activeCustomer.shiptoparty_code,
    streetName: activeCustomer.street,
    city: activeCustomer.city,
    salesman: activeCustomer.sales_name,
    salesmanPhone: activeCustomer.sales_phone,
    customerPhone: activeCustomer.customer_phone,
    doCount: activeCustomer.delivery_count,
    pickupCount: activeCustomer.pickup_count,
    isCOD,
    isCBD,
    isRedelivery: activeCustomer.redelivery_count > 0,
    isReschedule: activeCustomer.reschedule_count > 0,
    isPickup: activeCustomer.pickup_count > 0,
    isCustPhoneAvail,
    isSalesPhoneAvail,
    isDeliverySJCompleted,
    isPickupSJCompleted,
    isRedeliveryDO
  };

  return {
    activeCustomer,
    isLoadingPrice,
    customerData: formattedCustomerData,
    doList: activeCustomer.deliveries,
    reasons: shipmentPlanStore.reasons,
    errorSubmit: shipmentPlanStore.errorSubmit,
    isSuccessSubmit: shipmentPlanStore.isSuccessSubmit,
    currentTab: customerListStore.currentTab,
    isPickupEnabled: delivery !== 'PENDING' || activeCustomer.delivery_count === 0 ? true : false // TODO: Later add algo for pickup enabled
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    setDoStatus: (doNumber, status, reason) => {
      dispatch({
        type: 'SET_DO_STATUS',
        doNumber,
        status,
        reason
      });
    },
    setToRedelivery: (reason, isPickup) => {
      dispatch({
        type: 'SET_REDELIVERY',
        reason,
        isPickup
      });
    },
    selectDO: (deliveries) => dispatch({ type: 'SELECT_DO', activeDO: deliveries }),
    setDocSJ: (status, isPickup) => dispatch({ type: 'SET_DOCUMENT_SJ', isPickup, status }),
    submitDO: (imageData, shipment) => dispatch(submitDoAction(imageData, shipment)),
    resetSubmitStatus: () => dispatch({ type: 'RESET_SUBMIT_STATUS' }),
    setCurrentTab: (currentTab) => dispatch({ type: 'SELECT_CURRENT_TAB', currentTab }),
    getFinalPrice: (payload) => dispatch(getFinalPriceAction(payload)),
    setShipmentStatus: (customer) => dispatch({ type: 'SET_SHIPMENT_STATUS', customer })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailScreen);
