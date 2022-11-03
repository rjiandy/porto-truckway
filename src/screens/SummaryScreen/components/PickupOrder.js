import React, { useState } from 'react';
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

const styles = StyleSheet.create({
  pickupOrderContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.lightGray
  },
  pickupOrderCollapsible: {
    flexDirection: 'row',
    paddingHorizontal: 14
  },
  pickupOrderHeader: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.grayX,
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 12
  },
  pickupOrderRow: {
    marginHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row'
  }
});

export default function PickupOrder(props) {
  const { source } = props;
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <Section style={styles.pickupOrderContainer}>
      <TouchableOpacity
        style={styles.pickupOrderCollapsible}
        onPress={() => setCollapsed(!isCollapsed)}
      >
        <StyledText
          style={[fonts['Roboto-14-black-bold'], { flex: 1 }]}
        >
          {`DO No. ${source.do_no}`}
        </StyledText>
        <Icon
          name={isCollapsed ? 'chevron-up' : 'chevron-down'}
          size={18}
        />
      </TouchableOpacity>
      {
        isCollapsed && (
          <Section style={{ flexDirection: 'column' }}>
            <Section style={styles.pickupOrderHeader}>
              <StyledText style={[fonts['Roboto-12-white'], { flex: 1 }]}>
                Material
              </StyledText>
              <StyledText style={[fonts['Roboto-12-white'], { flex: 0.6 }]}>
                Qty
              </StyledText>
            </Section>
            {
              source && source.delivery_order_items.map((data, index) => (
                <Section style={styles.pickupOrderRow} key={index}>
                  <StyledText style={[fonts['Roboto-12-black-bold'], { flex: 1 }]}>
                    {data.product_name}
                  </StyledText>
                  <StyledText style={[fonts['Roboto-12-black'], { flex: 0.6 }]}>
                    {`${data.qty_received}/${data.qty_conversion}`}
                  </StyledText>
                </Section>
              ))
            }
          </Section>
        )
      }
    </Section>
  );
}

