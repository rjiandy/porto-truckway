import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import colors from '../../themes/colors';
import fonts from '../../themes/fonts';
import { deviceHeight } from '../../utils/platform';

import {
  Body,
  Page,
  Section,
  StyledText,
  Header,
  Icon
} from '../../components';

import DetailIcon from '../../assets/rincian_icon.png';
import PaymentMethodIcon from '../../assets/metode_pembayaran_icon.png';
import VerifiedIcon from '../../assets/verified_transaction.png';

import { countTotalAmount } from '../../utils/helper';

const styles = StyleSheet.create({
  upperBody: {
    flex: 1,
    justifyContent: 'space-between'
  },
  footer: {
    borderTopWidth: 10,
    borderColor: colors.cultured,
    paddingVertical: 14
  },
  paymentMethodBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.lightGray,
    padding: 14,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 14,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: colors.brightNavyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
    borderRadius: 6,
    height: 40,
    flexDirection: 'row'
  },
  headers: {
    margin: 14,
    flexDirection: 'row'
  },
  rowItem: {
    marginHorizontal: 16,
    marginBottom: 12
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginBottom: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lightGray
  },
  ddMainContent: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingVertical: 13
  },
  ddDetailContent: {
  },
  ddDetailRowItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: 'row'
  },
  totalAmount: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 34
  },
  secondButtonTemp: {
    borderWidth: 1,
    borderColor: colors.silver,
    width: 72,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  }
});

export function CODTransactionScreen(props) {
  const { customer, deliveries, resetUpdatePrice, errorUpdatePrice, updatePrice } = props;
  const [isCollapsed, setCollapsed] = useState(true);
  const [amount, setAmount] = useState('');
  const [tax, setTax] = useState('');
  const [amountAfterTax, setAmountAfterTax] = useState('');

  useEffect(() => {
    return () => {
      resetUpdatePrice();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isHaveUpdatePrice = updatePrice && updatePrice.hasOwnProperty('deliveries');
    const payload = errorUpdatePrice || !isHaveUpdatePrice ? deliveries : updatePrice.deliveries;
    const counterTotal = countTotalAmount(payload);

    setAmount(counterTotal.totalAmount);
    setTax(counterTotal.totalTax);
    setAmountAfterTax(counterTotal.totalAmountAfterTax);
  }, [deliveries, errorUpdatePrice, updatePrice]);

  const isFailedShipment = customer.deliveries.filter(item => item.do_status === 'FAILED').length === customer.deliveries.length;

  return (
    <Page>
      <Header title="Pembayaran" />
      <Body contentContainerStyle={{ flex: deviceHeight > 700 ? 1 : 0 }}>
        <Section style={styles.upperBody}>
          <Section>

            <Section style={styles.headers}>
              <Image
                source={DetailIcon}
                style={{ width: 18, height: 18, marginRight: 6 }}
              />
              <StyledText style={fonts['Roboto-16-davysGrey-bold']}>
                Perincian
              </StyledText>
            </Section>
            <Section style={styles.rowItem}>
              <StyledText style={fonts['Roboto-12-davysGrey']}>Nama Toko</StyledText>
              <StyledText style={fonts['Roboto-14-black']}>{customer.shiptoparty_name}</StyledText>
            </Section>
            <Section style={styles.rowItem}>
              <StyledText style={fonts['Roboto-12-davysGrey']}>Nama Penerima</StyledText>
              <StyledText style={fonts['Roboto-14-black']}>{customer.shiptoparty_person}</StyledText>
            </Section>
            <Section style={styles.rowItem}>
              <StyledText style={fonts['Roboto-12-davysGrey']}>Nomor Telepon Penerima</StyledText>
              <StyledText style={fonts['Roboto-14-black']}>{customer.customer_phone}</StyledText>
            </Section>
            <Section style={[styles.rowItem, { marginBottom: 18 }]}>
              <StyledText style={fonts['Roboto-12-davysGrey']}>Alamat Pengiriman</StyledText>
              <StyledText style={fonts['Roboto-14-black']}>
                {`${customer.street}, ${customer.villages}, ${customer.district} - ${customer.city}`}
              </StyledText>
            </Section>
            <Section style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.ddMainContent} onPress={() => setCollapsed(!isCollapsed)}>
                <Section style={{ flex: 1 }}>
                  <StyledText style={fonts['Roboto-14-black']}>
                    Total Payment
                  </StyledText>
                  <StyledText style={fonts['Roboto-12-davysGrey']}>
                    (Setelah 10% Pajak)
                  </StyledText>
                </Section>
                <Section style={styles.totalAmount}>
                  <StyledText style={fonts['Roboto-16-blue']}>
                    { isFailedShipment || Number(amountAfterTax.split('.').join('')) > 0 ? `Rp. ${amountAfterTax}` : 'Rp. -'}
                  </StyledText>
                  <Icon
                    name={isCollapsed ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.davysGrey}
                    style={{
                      position: 'absolute',
                      right: -24
                    }}
                  />
                </Section>
              </TouchableOpacity>
              {
                isCollapsed && (
                  <Section style={styles.ddDetailContent}>
                    <Section style={styles.ddDetailRowItem}>
                      <StyledText style={fonts['Roboto-14-black-bold']}>
                        Rincian Pembayaran
                      </StyledText>
                    </Section>
                    <Section style={styles.ddDetailRowItem}>
                      <Section style={{ flex: 1 }}>
                        <StyledText>Tax (10%)</StyledText>
                      </Section>
                      <Section style={{ flex: 1, marginRight: 24, alignItems: 'flex-end' }}>
                        <StyledText style={[fonts['Roboto-14-blue-bold']]}>
                          { isFailedShipment || Number(tax.split('.').join('')) > 0 ? `Rp ${tax}` : 'Rp. -' }
                        </StyledText>
                      </Section>
                    </Section>
                    <Section style={[styles.ddDetailRowItem, { marginHorizontal: 12, paddingHorizontal: 0 }]}>
                      <Section style={{ flex: 1 }}>
                        <StyledText>Subtotal</StyledText>
                      </Section>
                      <Section style={{ flex: 1, marginRight: 24, alignItems: 'flex-end' }}>
                        <StyledText style={[fonts['Roboto-14-blue-bold']]}>
                          { isFailedShipment || Number(amount.split('.').join('')) > 0 ? `Rp ${amount}` : 'Rp. -' }
                        </StyledText>
                      </Section>
                    </Section>
                  </Section>
                )
              }
            </Section>
          </Section>
          <Section style={styles.footer}>
            <Section style={[styles.headers, { marginTop: 0 }]}>
              <Image
                source={PaymentMethodIcon}
                style={{ width: 18, height: 18, marginRight: 6 }}
              />
              <StyledText style={fonts['Roboto-16-davysGrey-bold']}>
                Metode Pembayaran
              </StyledText>
            </Section>
            <Section style={styles.paymentMethodBox}>
              <StyledText style={[fonts['Roboto-16-black-bold'], { flex: 1 }]}>
                Uang Tunai
              </StyledText>
              <TouchableOpacity style={styles.secondButtonTemp} disabled>
                <StyledText style={fonts['Roboto-14-silver']}>Ubah</StyledText>
              </TouchableOpacity>
            </Section>
            <TouchableOpacity style={styles.primaryButton} onPress={() => Actions.summaryScreen()}>
              <Image source={VerifiedIcon} style={{ width: 15, height: 18, marginRight: 8 }} />
              <StyledText style={fonts['Roboto-14-white']}>Lanjutkan Transaksi</StyledText>
            </TouchableOpacity>
          </Section>
        </Section>
      </Body>
    </Page>
  );
}

export function mapStateToProps(state) {
  const { customerListStore } = state;
  const { activeCustomer, errorUpdate, updatePriceShipment } = customerListStore;

  return {
    customer: activeCustomer,
    deliveries: activeCustomer.deliveries,
    errorUpdatePrice: errorUpdate,
    updatePrice: updatePriceShipment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetUpdatePrice: () => dispatch({ type: 'RESET_UPDATE_PRICE' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CODTransactionScreen);
