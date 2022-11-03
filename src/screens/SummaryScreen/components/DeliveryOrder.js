import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import {
  Section,
  StyledText,
  Icon
} from '../../../components';

import { transformCurrency } from '../../../utils/helper';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.lightGray
  },
  collapsibleButton: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems: 'center'
  },
  deliveryDetail: {
    borderTopWidth: 1,
    marginHorizontal: 10,
    borderColor: colors.lightGray,
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 5,
    flexDirection: 'row'
  }
});

export default function DeliveryOrder(props) {
  const { deliveries, checkFinalPrice } = props;
  const [isCollapsed, setCollapsed] = useState(false);
  const [deliveryOrders, setDeliveryOrder] = useState([...deliveries.delivery_order_items]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const { do_status } = deliveries;
    const orderItems = checkFinalPrice(deliveries);
    const checkAmount = orderItems.countAmount > 0 ? transformCurrency(orderItems.countAmount.toString()) : '-';
    const transformAmount = do_status !== 'FAILED' ? checkAmount : transformCurrency(orderItems.countAmount.toString());
    setTotalAmount(transformAmount);

    const sortItem = orderItems.newDeliveryOrders.reduce((res, item) => {
      if (item.category_status === 'parent') {
        const filterChild = orderItems.newDeliveryOrders.filter((delivery) => {
          return delivery.category_status === 'children' && delivery.parent_combo_code === item.product_code;
        });
        res = [item,...filterChild, ...res];

      } else if (!item.category_status) {
        res.push(item);
      }

      return res;
    }, []);

    if (orderItems.newDeliveryOrders.length > 0) {
      setDeliveryOrder(sortItem);
    }
  }, [checkFinalPrice, deliveries]);

  return (
    <Section style={styles.container}>
      <TouchableOpacity
        style={styles.collapsibleButton}
        onPress={() => setCollapsed(!isCollapsed)}
      >
        <Section style={{ flex: 1 }}>
          <StyledText style={fonts['Roboto-12-davysGrey']}>Do No.</StyledText>
          <StyledText style={fonts['Roboto-16-black-bold']}>{deliveries.do_no}</StyledText>
        </Section>
        <Section style={{ flex: 1, marginRight: 10, alignItems: 'flex-end' }}>
          <StyledText style={fonts['Roboto-12-davysGrey']}>Total Payment</StyledText>
          <StyledText style={fonts['Roboto-16-blue']}>{`Rp. ${totalAmount}`}</StyledText>
        </Section>
        <Icon
          name={isCollapsed ? 'chevron-up' : 'chevron-down'}
          size={18}
        />
      </TouchableOpacity>
      {
        isCollapsed &&
          deliveryOrders.map((data, index) => (
            <Section style={styles.deliveryDetail} key={index}>
              <Section style={{ flex: 1 }}>
                <StyledText style={[fonts['Roboto-14-black'], { marginBottom: 10 }]}>
                  {data.product_name}
                </StyledText>
                <StyledText style={[fonts['Roboto-14-black'], { marginBottom: 10 }]}>
                  {`Quantity : ${data.qty_received}/${data.qty_conversion}`}
                </StyledText>
                <StyledText style={fonts['Roboto-14-black']}>
                  Bukti Foto :
                </StyledText>
              </Section>
              <Section style={{ flex: 1, marginRight: 16, alignItems: 'flex-end' }}>
                <StyledText style={fonts['Roboto-14-black']}>
                  Nominal :
                </StyledText>
                <StyledText style={fonts['Roboto-14-black']}>
                  {
                    deliveries.do_status !== 'FAILED' ?
                      `Rp. ${totalAmount ?
                        data.amount_received >= 0 ? transformCurrency(Math.round(data.amount_received).toString()) : ' -'
                        : transformCurrency(Math.round(data.final_amount_material_success_offline).toString())}`
                      : 'Rp. 0'
                  }
                </StyledText>
                <StyledText style={fonts['Roboto-12-davysGrey']}>
                  Ppn 10%
                </StyledText>
              </Section>
            </Section>
          ))
      }
    </Section>
  );
}
