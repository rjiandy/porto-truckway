import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import bonusActive from '../../../assets/bonus_text_active.png';
import bonusDeactive from '../../../assets/bonus_text_deactive.png';
import bonusIcon from '../../../assets/bonus_icon.png';
import comboBundle from '../../../assets/combo_bundle.png';
import lockClose from '../../../assets/lock_close.png';

import {
  Section,
  StyledText
} from '../../../components';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: colors.cultured
  },
  content: {
    backgroundColor: colors.white,
    padding: 14,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  contentBonus: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 52,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  lastRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttonPlacing: {
    position: 'absolute',
    right: 14,
    bottom: 14
  },
  // Button Styles
  smallButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 66,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.brightNavyBlue,
    alignSelf: 'flex-end'
  },
  line: {
    borderTopWidth: 0.5,
    borderTopColor: colors.lightGray,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 4
  },
  lineVerticalDash: {
    borderWidth: 0.75,
    borderColor: colors.lightGray,
    position: 'absolute',
    top: 25,
    left: 26,
    zIndex: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    height: '120%'
  },
  lineVertical: {
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
    position: 'absolute',
    top: 25,
    left: 26,
    zIndex: 1,
    height: '120%'
  },
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    width: '5%',
    position: 'absolute',
    top: '44%',
    left: 26
  },
  customerStatus: {
    width: 24,
    height: 24,
    left: 14,
    top: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10
  },
  warningText: {
    fontSize: 10,
    color: colors.cinnabar
  },
  lockIcon: {
    position: 'absolute',
    top: '44%',
    left: -3,
    zIndex: 10
  },
  selfCenter: {
    alignSelf: 'center'
  },
  icon: {
    width: 60,
    height: 22
  },
  textSilver: {
    color: colors.silver
  },
  containerBonus: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default function MaterialCard(props) {
  const {
    onPress,
    source: {
      product_name,
      product_code,
      product_uom,
      uom_conversion,
      qty_received,
      qty_conversion,
      quantity,
      isCombo: isComboBundle,
      isFreegood,
      delivery_items_bundle
    }
  } = props;
  const [isCollapsed, setCollapse] = useState(false);

  const descripsionQty = uom_conversion ?
    `${qty_received} / ${qty_conversion} ${uom_conversion}`
    : `${quantity} / ${quantity} ${product_uom}`;

  const isBonusValid = uom_conversion ? qty_received > 0 : true;

  if (isFreegood || isComboBundle ) {
    return (
      <Section style={styles.container}>
        <Section style={[styles.customerStatus, { backgroundColor: isComboBundle ? '#e43332' : '#00c04b' }]}>
          <Image
            source={isComboBundle ? comboBundle : bonusIcon}
            resizeMode="contain"
            style={{ width: isComboBundle ? 25 : 13, height: isComboBundle ? 25 : 14 }}
          />
        </Section>
        <Section style={styles.contentBonus}>
          <Section>
            <StyledText style={[fonts['Roboto-16-black-bold']]}>
              {product_name.length > 38 ? product_name.substring(0, 38 - 3) + '...' : product_name }
            </StyledText>
          </Section>
          <TouchableOpacity style={{ position: 'absolute', right: 14, top: 14 }} onPress={() => setCollapse(!isCollapsed)}>
            <Icon
              name={isCollapsed ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
            />
          </TouchableOpacity>
          {
            product_code && (
              <StyledText style={fonts['Roboto-12-davysGrey']}>
                {product_code}
              </StyledText>
            )
          }
          <Section style={{ paddingTop: 14 }}>
            <StyledText style={fonts['Roboto-14-davysGrey']}>
              {`Kuantitas: ${descripsionQty}`}
            </StyledText>
          </Section>
          <Section style={styles.buttonPlacing}>
            <TouchableOpacity style={styles.smallButtonContainer} onPress={onPress}>
              <StyledText style={fonts['Roboto-14-blue']}>Ubah</StyledText>
            </TouchableOpacity>
          </Section>
        </Section>
        {
          delivery_items_bundle.map((item, index) => (
            <Section key={item.product_code} style={[
              { ...styles.contentBonus, paddingVertical: 0, paddingBottom: 14 },
              !isCollapsed && { display: 'none' },
              !isBonusValid && { backgroundColor: colors.cultured }
            ]}>
              <Section style={[styles.line, styles.containerBonus, !isFreegood && { justifyContent: 'flex-end' }]}>
                {
                  isFreegood && (
                    <Image source={isBonusValid ? bonusActive : bonusDeactive} resizeMode="contain" style={styles.icon}/>
                  )
                }
                {
                  !isBonusValid && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="alert-circle"
                        style={styles.warningText}
                      />
                      <Text style={styles.warningText}>Tidak sesuai S&K</Text>
                    </View>
                  )
                }
              </Section>
              <Section style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                <StyledText style={[fonts['Roboto-16-black-bold'], styles.selfCenter, !isBonusValid && styles.textSilver]}>
                  {item.product_name}
                </StyledText>
                <StyledText style={[fonts['Roboto-12-davysGrey'], !isBonusValid && styles.textSilver]}>
                  {item.product_code}
                </StyledText>
                <Section style={{ paddingTop: 14 }}>
                  <StyledText style={[fonts['Roboto-14-davysGrey'], !isBonusValid && styles.textSilver]}>
                    {`Kuantitas: ${item.uom_conversion ?
                      `${item.qty_received} / ${item.qty_conversion} ${item.uom_received}`
                      : `${item.quantity} / ${item.quantity} ${item.product_uom}`} 
                    `}
                  </StyledText>
                </Section>
              </Section>
              { isComboBundle ?
                <View style={styles.lockIcon}>
                  <Image source={lockClose} resizeMode="contain" style={styles.icon}/>
                </View>
                : (
                  <Section
                    style={[
                      styles.lineHorizontal,
                      index === delivery_items_bundle.length - 1 && { ...styles.lineVertical, height: '44%', top: 0 }
                    ]}
                  />)
              }
              {
                index !== delivery_items_bundle.length - 1 ? (
                  <Section style={[isFreegood ? styles.lineVertical : styles.lineVerticalDash, { top: 0 }]}/>
                ) : isComboBundle && (
                  <Section style={[styles.lineVerticalDash, { height: '70%', top: 0 }]}/>
                )
              }
            </Section>
          ))
        }
        <Section style={[isComboBundle ? styles.lineVerticalDash : styles.lineVertical, { height: !isCollapsed ? '75%' : '40%' }]}/>
      </Section>
    );
  }

  return (
    <Section style={styles.container}>
      <Section style={styles.content}>
        <StyledText style={[fonts['Roboto-16-black-bold'], { alignSelf: product_name > 34 ? 'center' : 'flex-start', marginBottom: 6 }]}>
          {product_name}
        </StyledText>
        <StyledText style={fonts['Roboto-12-davysGrey']}>
          {product_code}
        </StyledText>
        <Section style={{ marginTop: 14 }}>
          <StyledText style={fonts['Roboto-14-davysGrey']}>
            {`Kuantitas: ${descripsionQty}`}
          </StyledText>
        </Section>
        <Section style={styles.buttonPlacing}>
          <TouchableOpacity style={styles.smallButtonContainer} onPress={onPress}>
            <StyledText style={fonts['Roboto-14-blue']}>Ubah</StyledText>
          </TouchableOpacity>
        </Section>
      </Section>
    </Section>
  );
}
