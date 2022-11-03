import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

import {
  Body,
  Page,
  Section,
  StyledText,
  Header,
  Icon,
  Col,
  Row,
  PrimaryButton
} from '../../components';

import DetailIcon from '../../assets/rincian_icon.png';
import EsignIcon from '../../assets/esign.png';
import RedeliveryDone from '../../assets/redelivery.png';
// import ErrorSubmit from '../../assets/wrong_account.png';

import { submitDoAction } from '../../stores/actions/shipmentPlanAction';
import { countTotalMaterialAmount } from '../../utils/helper';
import getCurrentLocation from '../../utils/getCurrentLocation';

import PickupOrder from './components/PickupOrder';
import DeliveryOrder from './components/DeliveryOrder';

const styles = StyleSheet.create({
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blueSapphireText: {
    fontSize: 12,
    color: colors.sapphireBlue
  },
  button: {
    paddingVertical: 12,
    marginHorizontal: 14,
    marginBottom: 14
  },
  disabledButton: {
    backgroundColor: colors.cultured2
  },
  headers: {
    margin: 14,
    flexDirection: 'row'
  },
  ddMainContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    marginHorizontal: 10,
    marginBottom: 14
  },
  mainCollapsible: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center'
  },
  signatureOutContainer: {
    borderTopWidth: 10,
    borderColor: colors.cultured2
  },
  tncContainer: {
    padding: 14,
    backgroundColor: colors.azureishWhite,
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: 14
  },
  tncIcon: {
    backgroundColor: colors.sapphireBlue,
    padding: 2,
    borderRadius: 40,
    marginRight: 6
  },

  // Imported from v1
  signatureContainer: {
    flex: 1,
    paddingBottom: 10,
    borderColor: colors.lightGray
  },
  canvasContainer: {
    flexDirection: 'column',
    flex: 1,
    borderRadius: 4,
    height: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gainsboro,
    marginHorizontal: 10
  },
  topCanvas: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  topCanvasContainer: {
    height: 30,
    backgroundColor: 'white',
    width: '100%'
  },
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 200
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginHorizontal: 24,
    paddingHorizontal: 10,
    marginTop: 100
  }
});

const checkFinalPrice = (deliveries) => {
  let countAmount = 0;
  let newDeliveryOrders = [];
  const {
    delivery_order_items: materials,
    do_status,
    total_amount_after_tax_do,
    amounts_source
  } = deliveries;

  if (do_status === 'SUCCESS' && amounts_source === 'TRUCKWAY') {
    countAmount += Math.round(total_amount_after_tax_do);
    newDeliveryOrders = materials.map(material => {
      const newMaterial = {
        ...material,
        amount_received: material.final_amount_material_success_offline
      };
      return newMaterial;
    });
  }
  else if (do_status !== 'FAILED') {
    materials.forEach(material => {
      const price = countTotalMaterialAmount(material);
      countAmount += Math.round(price.amount + price.tax);
      let newDelivery = {
        ...material,
        amount_received: price.amount + price.tax
      };
      newDeliveryOrders.push(newDelivery);
    });
  } else {
    newDeliveryOrders = materials.map(material => {
      let newMaterial = {
        ...material,
        amount_received: 0
      };
      return newMaterial;
    });
  }

  return {
    countAmount,
    newDeliveryOrders
  };
};

export function SummaryScreen(props) {
  const {
    deliveries,
    submitDO,
    activeCustomer,
    setShipmentStatus,
    currentTab,
    setCurrentTab,
    resetSubmitStatus,
    activeShipment,
    activeVisit
  } = props;
  // const [isPickupCollapsed, setPickupCollapsed] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const [isPickup, setIsPickup] = useState(currentTab);
  const [pickupList, setPickupList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);
  const [isSuccessSubmit, setSuccessSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [draggedCount, setDraggedCount] = useState(0);

  const esignRef = useRef(null);

  useEffect(() => {
    setIsPickup(currentTab);
    let pickup = [];
    let delivery = [];

    if (deliveries.length > 0) {
      deliveries.forEach((item) => {
        if (item.is_pickup === 1) {
          pickup.push(item);
        } else {
          delivery.push(item);
        }
      });
      setDeliveryList(delivery);
      setPickupList(pickup);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, [isSuccessSubmit, errorSubmit]);

  const onResetSign = () => {
    setDraggedCount(0);
    esignRef.current.resetImage();
  };

  const onDragEvent = () => {
    setDraggedCount(draggedCount + 1);
  };

  const onSubmit = () => {
    setIsLoading(true);
    esignRef.current.saveImage();
  };

  const onSaveEvent = async (result) => {

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

    const newDeliveryList = [...deliveryList].map(item => {
      const finalPriceItem = checkFinalPrice(item);
      return {
        ...item,
        delivery_order_items: finalPriceItem.newDeliveryOrders
      };
    });
    const newDeliveries = isPickup ? pickupList : newDeliveryList;

    const base64String = `data:image/png;base64,${result.encoded}`;

    const [
      isSuccess,
      isFailed,
      isRedelivery
    ] = [
      newDeliveries.filter(data => data.do_status === 'SUCCESS').length === newDeliveries.length,
      newDeliveries.filter(data => data.do_status === 'FAILED').length === newDeliveries.length,
      newDeliveries.find(data => isPickup ? data.is_reschedule : data.is_redelivery)
    ];
    const shipmentStatus = isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : isRedelivery ? 'REDELIVERY' : 'PARTIAL';
    const payload = {
      ...activeCustomer,
      submission_date: new Date(),
      deliveries: [...newDeliveries],
      driver_submit_location: {
        latitude,
        longitude
      },
      extraData: {
        activeShipment,
        activeVisit
      }
    };

    console.log(JSON.stringify(payload));

    if (isPickup) {
      Object.assign(payload, {
        shipment_status_customer: {
          ...activeCustomer.shipment_status_customer,
          pickup: shipmentStatus
        }
      });
    } else {
      Object.assign(payload, {
        shipment_status_customer: {
          ...activeCustomer.shipment_status_customer,
          delivery: shipmentStatus
        }
      });
    }

    if (result.encoded) {
      setShipmentStatus(payload);
      submitDO(base64String, payload);
    } else {
      setShipmentStatus(payload);
      submitDO('', payload);
    }
    setIsLoading(false);
    setSuccessSubmit(true);
  };

  const onSuccessSubmit = () => {
    if (currentTab === 0 && pickupList.length > 0) {
      setCurrentTab(1);
      Actions.popTo('customerDetailScreen');
    } else {
      Actions.popTo('customerListScreen');
    }
    resetSubmitStatus();
    // Actions.popTo('customerListScreen');
  };

  return (
    <>
      <Page>
        <Header title="E - Sign"/>
        <Body>
          <Section style={styles.headers}>
            <Image
              source={DetailIcon}
              style={{ width: 18, height: 18, marginRight: 6 }}
            />
            <StyledText style={fonts['Roboto-16-davysGrey-bold']}>
              Rangkuman
            </StyledText>
          </Section>
          <Section style={styles.ddMainContainer}>
            <TouchableOpacity
              style={styles.mainCollapsible}
              onPress={() => setCollapsed(!isCollapsed)}
            >
              <StyledText style={[fonts['Roboto-14-black-bold'], { flex: 1 }]}>
                {isPickup ? 'Pengambilan' : 'Pengiriman'}
              </StyledText>
              <Icon
                name={isCollapsed ? 'chevron-up' : 'chevron-down'}
                size={18}
              />
            </TouchableOpacity>
            {
              isPickup ? isCollapsed &&
              pickupList.map((data, index) => (
                <PickupOrder key={index} source={data} />
              )) : isCollapsed &&
                deliveryList.map((data, index) => (
                  <DeliveryOrder key={index} deliveries={data} checkFinalPrice={checkFinalPrice}/>
                ))
            }
          </Section>
          <Section style={styles.signatureOutContainer}>
            <Section style={styles.headers}>
              <Image
                source={EsignIcon}
                style={{ width: 18, height: 18, marginRight: 6 }}
              />
              <StyledText style={fonts['Roboto-16-davysGrey-bold']}>
                Tanda Tangan
              </StyledText>
            </Section>
            <Col style={styles.signatureContainer}>
              <Section style={styles.canvasContainer}>
                <Section style={styles.topCanvasContainer}>
                  <Section style={styles.topCanvas}>
                    <StyledText style={fonts['Roboto-14']}>Tanda Tangan Di sini</StyledText>
                    <TouchableOpacity
                      onPress={() => onResetSign()}
                    >
                      <Icon name="md-repeat" size={20} style={{ color: colors.black }} />
                    </TouchableOpacity>
                  </Section>
                </Section>
                <SignatureCapture
                  style={{ flex: 1 }}
                  ref={esignRef}
                  onSaveEvent={(res) => onSaveEvent(res)}
                  onDragEvent={() => onDragEvent()}
                  saveImageFileInExtStorage
                  showNativeButtons={false}
                  showTitleLabel={false}
                  viewMode="portrait"
                />
              </Section>
              <Section style={styles.tncContainer}>
                <Row style={[styles.rowAlignCenter, { marginBottom: 8 }]}>
                  <Section style={styles.tncIcon}>
                    <Icon name="md-alert" size={12} color={colors.white} />
                  </Section>
                  <StyledText style={[styles.blueSapphireText, { fontWeight: '700' }]}>
                    Syarat dan Ketentuan!
                  </StyledText>
                </Row>
                <Row>
                  <StyledText style={styles.blueSapphireText}>* </StyledText>
                  <StyledText style={styles.blueSapphireText}>
                    Dengan membubuhkan tanda tangan elektronik (e-sign) pada aplikasi
                    ini maka saya menyatakan bahwa saya merupakan perwakilan yang
                    sah dari Pembeli dan dengan ini setuju bahwa Barang yang saya
                    terima telah lengkap, benar dan sesuai dengan Pesanan yang
                    saya lakukan pada aplikasi Tokosmart.
                  </StyledText>
                </Row>
                <Row>
                  <StyledText style={styles.blueSapphireText}>* </StyledText>
                  <StyledText style={styles.blueSapphireText}>
                    Saya setuju, mengerti dan oleh karenanya tunduk terhadap
                    Syarat & Ketentuan Tokosmart.
                  </StyledText>
                </Row>
              </Section>
            </Col>
          </Section>
          <PrimaryButton
            style={styles.button}
            disabled={draggedCount === 0 || isLoading}
            label={currentTab === 0 ? 'Pengiriman Selesai' : 'Pengambilan Selesai'}
            onPress={onSubmit}
            isLoading={isLoading}
          />
        </Body>
      </Page>
      {
        isSuccessSubmit && (
          <Section style={styles.overlay2}>
            <Section style={styles.modalContainer}>
              <Image
                source={RedeliveryDone}
                resizeMode="contain"
                style={{ width: 202, height: 162, marginTop: 40, marginBottom: 14, alignSelf: 'center' }}
              />
              <StyledText
                style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}
              >
                Selamat!
              </StyledText>
              <StyledText
                style={[fonts['Roboto-14-davysGrey'], { marginHorizontal: 16.5, textAlign: 'center' }]}
              >
                Pengiriman telah selesai!
              </StyledText>
              <PrimaryButton
                label="Ok!"
                customStyles={{ marginHorizontal: 16.5, marginVertical: 24 }}
                onPress={onSuccessSubmit}
              />
            </Section>
          </Section>
        )
      }
    </>
  );
}

function mapStateToProps(state) {
  const { customerListStore, submitStore } = state;
  const { activeCustomer, updatePriceShipment, currentTab } = customerListStore;
  const { activeShipment, activeVisit } = submitStore;

  return {
    currentTab,
    activeCustomer,
    deliveries: updatePriceShipment && updatePriceShipment.hasOwnProperty('deliveries') ? updatePriceShipment.deliveries : activeCustomer.deliveries,
    activeShipment,
    activeVisit
  };
}
function mapDispatchToProps(dispatch) {
  return {
    submitDO: (imageData, shipment) => dispatch(submitDoAction(imageData, shipment)),
    setCurrentTab: (currentTab) => dispatch({ type: 'SELECT_CURRENT_TAB', currentTab }),
    setShipmentStatus: (customer) => dispatch({ type: 'SET_SHIPMENT_STATUS', customer }),
    resetSubmitStatus: () => dispatch({ type: 'RESET_SUBMIT_STATUS' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);
