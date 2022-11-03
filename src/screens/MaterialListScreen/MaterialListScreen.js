import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';
import { deviceHeight } from '../../utils/platform';

import {
  Page,
  Section,
  StyledText,
  Icon,
  Header,
  PrimaryButton,
  SecondaryButton
} from '../../components';

import AddPhotonImg from '../../assets/icon_add_photo.png';
import triangleAlert from '../../assets/triangle_alert.png';

import MaterialCard from './components/MaterialCard';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 14,
    flexDirection: 'column'
  },

  // Modal styles
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
    zIndex: 100
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 14,
    flexDirection: 'column',
    height: deviceHeight - 68 > 466 ? 'auto' : deviceHeight - 68
  },
  grayBorderBox: {
    borderRadius: 6,
    borderColor: colors.lightGray,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    paddingVertical: 8,
    fontWeight: '700',
    fontSize: 14,
    color: colors.black
  },
  arrowIcon: {
    position: 'absolute',
    right: 14
  },
  photoSection: {
    marginBottom: 14,
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray
  },
  buttonSection: {
    flexDirection: 'column',
    paddingBottom: 14
  },

  // Reason selection style
  overlay2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200
  },
  reasonsContainer: {
    width: '80%',
    height: '45%',
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 10
  },
  reasonChoice: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderColor: colors.lightGray
  },

  //Dropdown style
  ddContainer: {
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    minHeight: 40,
    marginTop: 6,
    marginBottom: 14,
    flexDirection: 'row'
  },
  ddIcon: {
    position: 'absolute',
    right: 14
  },
  disabledContainer: {
    borderColor: colors.silver,
    backgroundColor: colors.gainsboro
  },

  iconButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 40,
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row'
  },
  img: {
    width: 18,
    height: 18,
    marginLeft: 6
  }
});

function ReasonDropdown(props) {
  const {
    label,
    onPress,
    disabled
  } = props;
  let mainTextStyle = colors.black;

  if (label) {
    mainTextStyle = {
      color: colors.black,
      fontWeight: '700'
    };
  } else {
    mainTextStyle = { color: colors.lightGray };
  }

  return (
    <TouchableOpacity
      style={[styles.ddContainer, disabled && styles.disabledContainer]}
      onPress={() => onPress()}
      disabled={disabled}
    >
      <StyledText
        style={[mainTextStyle, disabled && { color: colors.silver }]}
      >
        {label ? label : 'Pilih alasan penolakan'}
      </StyledText>
      <Icon
        name="chevron-down"
        style={styles.ddIcon}
        color={disabled ? colors.silver : colors.davysGrey}
        size={18}
      />
    </TouchableOpacity>
  );
}

function UOMDropdown(props) {
  const {
    label,
    onPress,
    disabled
  } = props;
  let mainTextStyle = colors.black;

  if (label) {
    mainTextStyle = {
      color: colors.black,
      fontWeight: '700'
    };
  } else {
    mainTextStyle = { color: colors.lightGray };
  }

  return (
    <TouchableOpacity
      style={[styles.grayBorderBox, disabled && styles.disabledContainer]}
      onPress={() => onPress()}
      disabled={disabled}
    >
      <StyledText
        style={[mainTextStyle, disabled && { color: colors.silver }]}
      >
        {label ? label : 'Pilih alasan penolakan'}
      </StyledText>
      <Icon
        name="chevron-down"
        style={styles.ddIcon}
        color={disabled ? colors.silver : colors.davysGrey}
        size={18}
      />
    </TouchableOpacity>
  );
}

function convertUOM(qty, from, to, uomOptions) {
  const dict = new Map();
  uomOptions.forEach(data => {
    dict.set(data.sequence, Number(data.qty));
  });

  const start = from >= to ? to : from;
  const end = to <= from ? from : to;
  let multipliers = null;

  for (let i = start; i <= end; i++) {
    if (i === start) {
      multipliers = dict.get(i);
    } else {
      multipliers *= dict.get(i);
    }
  }

  if (from > to) {
    return qty / multipliers;
  } else {
    return qty * multipliers;
  }
}

function removeUomOptions (data, key, uom) {
  const len = data.length;
  if (len > 0) {
    const findSequence = data.find(seq => seq[key] === uom);
    return data.slice(findSequence.sequence - 1, len);
  }
  return data;
}

// TODO
// 1. Use Max qty default as input
// 2. Set UOM changeable
export function MaterialListScreen(props) {
  const { reasons, deliveries, doNumber, setDeliveryItems } = props;

  const [isModalShown, setModalShown] = useState(false);
  const [maxQty, setMaxQty] = useState(''); // later use max total qty
  const [quantityInput, setQuantityInput] = useState(''); // later use max total qty
  const [isQuantityValid, setQuantityValid] = useState(true);
  const [uomOptions, setUomOptions] = useState([]);

  const [isReasonShown, setReasonShown] = useState(false);
  const [isUomShown, setUomShown] = useState(false);
  const [isWarningShown, setWarningShown] = useState(false);

  const [activeReason, setActiveReason] = useState('');
  const [activeUom, setActiveUom] = useState('Box');

  const [deliveryOrderItem, setDeliveryOrderItem] = useState({});
  const [deliveryOrderItems, setDeliveryOrderItems] = useState([...deliveries]);

  const onQuantityChange = (qty) => {
    const numberInput = Number(qty);
    const { isFreegood } = deliveryOrderItem;

    if (numberInput === Number(maxQty)) {
      setActiveReason('');
    }

    setQuantityValid(!isFreegood ? numberInput <= Number(maxQty) && numberInput >= 0 : numberInput === 0 || numberInput === Number(maxQty));
    setWarningShown(numberInput > Number(maxQty));
  };

  const onMaterialDetailChange = (delivery_order_item) => {
    const selectedReason = reasons && reasons.length > 0 ? reasons.find(reason => reason.reason_id === delivery_order_item.reason_id) : '';
    if (delivery_order_item.uom_conversion) {
      setMaxQty(`${delivery_order_item.qty_conversion}`);
      setActiveUom(delivery_order_item.uom_received);
      setQuantityInput(delivery_order_item.qty_received.toString());
    } else {
      setMaxQty(`${delivery_order_item.quantity}`);
      setActiveUom(delivery_order_item.product_uom);
      setQuantityInput(delivery_order_item.quantity.toString());
    }
    setDeliveryOrderItem(delivery_order_item);
    setActiveReason(selectedReason);
    setModalShown(true);
  };

  const onMaterialDetailSave = () => {
    let newConversion = {};

    if (!deliveryOrderItem.uom_conversion) {
      newConversion = {
        uom_conversion: deliveryOrderItem.product_uom,
        qty_conversion: deliveryOrderItem.quantity
      };
    }
    if (deliveryOrderItem.isFreegood) {
      const newChildFreeGood = deliveryOrderItem.delivery_items_bundle.map(item => {
        return {
          ...item,
          ...newConversion,
          qty_received: Number(quantityInput) > 0 ? item.quantity : Number(quantityInput),
          uom_received: item.product_uom,
          reason_id: activeReason ? activeReason.reason_id : null,
          qty_difference: item.quantity - Number(quantityInput),
          uom_conversion: item.product_uom,
          qty_conversion: item.quantity
        };
      });
      newConversion.delivery_items_bundle = newChildFreeGood;
    }
    const newDeliveryOrderItem = {
      ...deliveryOrderItem,
      ...newConversion,
      qty_received: Number(quantityInput),
      uom_received: activeUom,
      uom_difference: activeUom,
      reason_id: activeReason ? activeReason.reason_id : null,
      qty_difference: maxQty - Number(quantityInput)
    };

    const newDeliveryOrderItems = deliveryOrderItems.map(deliveryItem => {
      if (deliveryItem.product_code === newDeliveryOrderItem.product_code) {
        return newDeliveryOrderItem;
      }
      return deliveryItem;
    });
    setDeliveryOrderItems(newDeliveryOrderItems);
  };

  const onMaterialSave = () => {
    let [statusSuccess, statusFailed] = [0,0];
    const reContractedDeliveryOrder = deliveryOrderItems.reduce((res, item) => {
      let { isCombo, isFreegood, delivery_items_bundle, ...newDeliveryOrderItem } = { ...item };

      if (isFreegood || isCombo) {
        const delivery = res.concat([newDeliveryOrderItem, ...delivery_items_bundle]);
        return delivery;
      } else {
        res.push(newDeliveryOrderItem);
        return res;
      }
    }, []);

    const newDeliveryOrderItems = reContractedDeliveryOrder.map(deliveryItem => {

      if (!deliveryItem.uom_conversion) {
        deliveryItem = {
          ...deliveryItem,
          qty_conversion: deliveryItem.quantity,
          uom_conversion: deliveryItem.product_uom,
          qty_received: deliveryItem.quantity,
          qty_difference: 0
        };
      }

      if (deliveryItem.qty_received === 0){
        statusFailed += 1;
      } else if (deliveryItem.qty_received === deliveryItem.qty_conversion) {
        statusSuccess += 1;
      }

      return deliveryItem;
    });

    const status = statusSuccess === newDeliveryOrderItems.length ? 'SUCCESS' : statusFailed === newDeliveryOrderItems.length ? 'FAILED' : 'PARTIAL';
    setDeliveryItems(newDeliveryOrderItems, doNumber, status);
    Actions.popTo('customerDetailScreen');
  };

  const handleConvertUOM = (val) => {
    let from, to;
    let { quantity, uom_conversion, qty_conversion, product_uom, uom_convertions_list: { uom_options } } = deliveryOrderItem;

    const disc = new Map();
    uom_options.forEach((data, i) => {
      disc.set(data.uom_from, data.sequence);
    });

    if (disc.has(val)) {
      to = disc.get(val) - 1;
    }
    if (disc.has(product_uom)){
      from = disc.get(product_uom);
    }

    if (val === product_uom) {
      uom_conversion = product_uom;
      qty_conversion = quantity;
      setActiveUom(product_uom);
      setUomShown(false);
      setQuantityInput(quantity.toString());
      setMaxQty(quantity.toString());
    } else {
      const resultQty = convertUOM(quantity, from, to, uom_options);
      uom_conversion = val;
      qty_conversion = resultQty;
      setActiveUom(val);
      setUomShown(false);
      setQuantityInput(resultQty.toString());
      setMaxQty(resultQty.toString());
    }

    setActiveReason('');
    setDeliveryOrderItem({
      ...deliveryOrderItem,
      uom_conversion,
      qty_conversion
    });
  };

  const isHaveReason = quantityInput !== maxQty && !(activeReason && activeReason.hasOwnProperty('id'));
  const isHaveUomOptions = deliveryOrderItem.uom_convertions_list && deliveryOrderItem.uom_convertions_list.uom_options.length > 0;

  return (
    <Page>
      <Header title={`List Material DO No. ${doNumber}`}/>
      {
        isReasonShown && (
          <Section style={styles.overlay2}>
            <Section style={styles.reasonsContainer}>
              <ScrollView>
                {
                  reasons.map((reason, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.reasonChoice}
                      onPress={() => {
                        setActiveReason(reason);
                        setReasonShown(false);
                      }}
                    >
                      <StyledText
                        style={[
                          fonts['Roboto-14-black-bold'],
                          (reason.reason_id === (activeReason && activeReason.reason_id)) && { color: colors.brightNavyBlue }
                        ]}
                      >
                        {reason && reason.description}
                      </StyledText>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </Section>

          </Section>
        )
      }
      {
        isUomShown && (
          <Section style={styles.overlay2}>
            <Section style={styles.reasonsContainer}>
              <ScrollView>
                {
                  uomOptions.map((val, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.reasonChoice}
                      onPress={() => handleConvertUOM(val.uom_from)}
                    >
                      <StyledText
                        style={[
                          fonts['Roboto-14-black-bold'],
                          val.uom_from === activeUom && { color: colors.brightNavyBlue }
                        ]}
                      >
                        {val.uom_from}
                      </StyledText>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </Section>
          </Section>
        )
      }
      {
        isWarningShown && (
          <Section style={[styles.overlay2, { justifyContent: 'flex-start', paddingTop: 100 }]}>
            <Section style={[styles.reasonsContainer, { height: 'auto' }]}>
              <Image
                source={triangleAlert}
                resizeMode="contain"
                style={{ width: 80, height: 68, marginTop: 26, marginBottom: 16, alignSelf: 'center' }}
              />
              <StyledText
                style={[fonts['Roboto-16-black-bold'], { textAlign: 'center' }]}
              >
                Perhatian!
              </StyledText>
              <StyledText
                style={[fonts['Roboto-14-davysGrey'], { marginHorizontal: 16.5, textAlign: 'center' }]}
              >
                Anda tidak dapat memasukan kuantitas lebih besar dari yang ada pada dokumen.
              </StyledText>
              <PrimaryButton
                label="Saya mengerti"
                customStyles={{ marginHorizontal: 16.5, marginVertical: 24 }}
                onPress={() => setWarningShown(false)}
              />
            </Section>
          </Section>
        )
      }
      {
        isModalShown && (
          <Section style={styles.overlay}>
            <Section style={styles.modalContent}>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    setModalShown(false);
                    setQuantityValid(true);
                  }}
                  style={{ marginBottom: 10 }}
                >
                  <Icon
                    name="md-close"
                    color={colors.spanishGray}
                    size={24}
                  />
                </TouchableOpacity>
                <Section style={{ marginBottom: 10 }}>
                  { deliveryOrderItem.product_code && (
                    <StyledText style={[fonts['Roboto-12-davysGrey'], { marginBottom: 8 }]}>
                      {deliveryOrderItem.product_code}
                    </StyledText>
                  )}
                  <StyledText style={fonts['Roboto-16-black-bold']}>
                    {deliveryOrderItem.product_name}
                  </StyledText>
                </Section>
                <StyledText style={[fonts['Roboto-14-black'], !isQuantityValid && { color: colors.cinnabar }]}>
                  Terkirim
                </StyledText>
                <Section style={{ flexDirection: 'row', marginVertical: 10 }}>
                  <Section
                    style={[
                      styles.grayBorderBox,
                      { marginRight: 10 },
                      !isQuantityValid && { borderColor: colors.cinnabar }
                    ]}
                  >
                    <TextInput
                      value={quantityInput}
                      style={[styles.quantityInput, !isQuantityValid && { color: colors.cinnabar }]}
                      textAlign="center"
                      onChangeText={text => {
                        setQuantityInput(text);
                        onQuantityChange(text);
                      }}
                      keyboardType="number-pad"
                    />
                  </Section>
                  <UOMDropdown
                    label={activeUom}
                    disabled={Number(quantityInput) > Number(maxQty) || !isHaveUomOptions || deliveryOrderItem.isFreegood}
                    onPress={() => {
                      setUomShown(true);
                      setUomOptions(removeUomOptions(deliveryOrderItem.uom_convertions_list.uom_options, 'uom_from', deliveryOrderItem.product_uom));
                    }}
                  />
                </Section>
                <StyledText style={fonts['Roboto-14-black']}>
                  Alasan
                </StyledText>
                <ReasonDropdown
                  disabled={!isQuantityValid || quantityInput === maxQty}
                  label={activeReason ? activeReason.description : ''}
                  onPress={() => {
                    setReasonShown(true);
                  }}
                />
                <Section style={styles.photoSection}>
                  <StyledText>
                    Bukti foto (opsi pilihan)
                  </StyledText>
                  <TouchableOpacity style={styles.iconButton} disabled={true} onPress={() => alert('Not Implemented Yet')}>
                    <StyledText style={fonts['Roboto-14-blue-bold']}>Unggah Foto</StyledText>
                    <Image source={AddPhotonImg} style={styles.img} />
                  </TouchableOpacity>
                </Section>
                <Section style={styles.buttonSection}>
                  <PrimaryButton
                    label="Simpan Alasan"
                    customStyles={{ marginBottom: 14 }}
                    disabled={!isQuantityValid || isHaveReason}
                    onPress={() => {
                      onMaterialDetailSave();
                      setModalShown(false);
                    }}
                  />
                  <SecondaryButton
                    label="Batal"
                    onPress={() => {
                      setModalShown(false);
                      setQuantityValid(true);
                    }}
                  />
                </Section>
              </ScrollView>
            </Section>
          </Section>
        )
      }
      <Section style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
        >
          {
            deliveryOrderItems.map((delivery_order_item, i) => {
              return (
                <MaterialCard
                  key={i}
                  onPress={() => onMaterialDetailChange(delivery_order_item)}
                  source={delivery_order_item}
                />
              );
            })
          }
        </ScrollView>
        <Section style={styles.buttonContainer}>
          <PrimaryButton
            label="Simpan"
            customStyles={{ marginBottom: 14 }}
            onPress={() => onMaterialSave()}
          />
          <SecondaryButton
            label="Batal"
            onPress={() => Actions.pop()}
          />
        </Section>
      </Section>
    </Page>
  );
}

function mapStateToProps(state) {
  const { shipmentPlanStore, customerListStore } = state;
  const { activeDO } = customerListStore;

  const filterParentItem = activeDO.delivery_order_items.filter(item => {
    return !item.category_status || item.category_status === 'parent';
  });

  const newDelivery = filterParentItem.map(item => {
    const findChild = activeDO.delivery_order_items.filter(orderItem => {
      return orderItem.category_status === 'children' && item.product_code === orderItem.parent_combo_code;
    });

    const newItem = {
      ...item,
      isFreegood: item.category && item.category === 'FREE GOOD',
      isCombo: item.category && item.category === 'COMBO',
      delivery_items_bundle: findChild
    };

    return newItem;
  });

  return {
    reasons: shipmentPlanStore.reasons,
    doNumber: activeDO.do_no,
    deliveries: newDelivery
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDeliveryItems: (deliveryData, doNumber, status) => dispatch({ type: 'SET_DELIVERIES', deliveryData, doNumber, status })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialListScreen);
