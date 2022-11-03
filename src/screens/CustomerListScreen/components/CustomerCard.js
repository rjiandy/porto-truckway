import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Section,
  StyledText,
  Icon,
  Row
} from '../../../components';

import { deviceWidth } from '../../../utils/platform';

import colors from '../../../themes/colors';
import fonts from '../../../themes/fonts';

import PinLocation from '../../../assets/pin_pending.png';
import ShopIcon from '../../../assets/shop.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: colors.cultured
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 14,
    paddingLeft: 14,
    borderBottomWidth: 1,
    paddingBottom: 14,
    borderColor: colors.lightGray,
    backgroundColor: 'white'
  },
  customerStatus: {
    width: 24,
    height: 24,
    marginRight: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    flex: 1,
    width: '100%'
  },

  arrowHolder: {
    height: '100%',
    paddingRight: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: 80
  },
  custTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6
  },
  custTagText: {
    color: colors.white,
    fontSize: 12
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  smallLocationContainer: {
    flexDirection: 'column',
    marginTop: 8
  },

  smallImage: {
    width: 8,
    height: 12,
    marginRight: 5
  },
  shopImage: {
    width: 12,
    height: 10,
    marginLeft: 8,
    marginRight: 4
  }
});

function getCustStatusColor(status) {
  switch (status) {
    case 'success': {
      return { backgroundColor: colors.darkPastelGreen };
    }
    case 'redelivery': {
      return { backgroundColor: colors.littleBoyBlue };
    }
    case 'rescheduled': {
      return { backgroundColor: colors.littleBoyBlue };
    }
    default: {
      return { backgroundColor: colors.platinum };
    }
  }
}

function getCustStatusIcon(status) {
  switch (status) {
    case 'success': {
      return <Icon name="md-checkmark-outline" size={12} color={colors.white} />;
    }
    case 'redelivery': {
      return <Icon name="md-close" size={12} color={colors.white} />;
    }
    default: {
      return <Icon name="location" size={14} color={colors.white} />;
    }
  }
}

export function getCustomerTag(tag) {
  switch (tag.toLowerCase()) {
    case 'cod': {
      return (
        <Section style={[styles.custTag, { backgroundColor: colors.emerald }]}>
          <StyledText style={styles.custTagText}>COD</StyledText>
        </Section>
      );
    }
    case 'cbd': {
      return (
        <Section style={[styles.custTag, { backgroundColor: colors.yellowGreen }]}>
          <StyledText style={styles.custTagText}>CBD</StyledText>
        </Section>
      );
    }
    case 'pickup': {
      return (
        <Section style={[styles.custTag, { backgroundColor: colors.orangeYellow }]}>
          <StyledText style={styles.custTagText}>Pickup</StyledText>
        </Section>
      );
    }
    case 'redelivery': {
      return (
        <Section style={[styles.custTag, { backgroundColor: colors.littleBoyBlue }]}>
          <StyledText style={styles.custTagText}>Redelivery</StyledText>
        </Section>
      );
    }
    case 'reschedule': {
      return (
        <Section style={[styles.custTag, { backgroundColor: colors.littleBoyBlue }]}>
          <StyledText style={styles.custTagText}>Reschedule</StyledText>
        </Section>
      );
    }
    default: {
      return null;
    }
  }
}

export default function CustomerCard(props) {
  const {
    status,
    customerName,
    location,
    distributionChannel,
    isCOD,
    isCBD,
    isRedelivery,
    isPickup,
    isReschedule,
    onPress
  } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Section style={styles.cardContainer}>
        <Section style={[styles.customerStatus, getCustStatusColor(status)]}>
          {getCustStatusIcon(status)}
        </Section>

        <Section style={styles.content}>
          <Section style={styles.tagContainer}>
            {isRedelivery && getCustomerTag(isRedelivery && 'Redelivery')}
            {isReschedule && getCustomerTag(isReschedule && 'Reschedule')}
            {isCOD && getCustomerTag(isCOD && 'COD')}
            {isCBD && getCustomerTag(isCBD && 'CBD')}
            {isPickup && getCustomerTag(isPickup && 'Pickup')}
          </Section>
          <StyledText style={fonts['Roboto-16-black-bold']}>
            {customerName.length > 30 ? `${customerName.slice(0, 30)}...` : customerName}
          </StyledText>

          {
            deviceWidth < 340 ? (
              <Section style={styles.smallLocationContainer}>
                <Row style={{ marginBottom: 4, alignItems: 'center' }}>
                  <Image source={ShopIcon} style={[styles.shopImage, { marginLeft: 0 }]} />
                  <StyledText style={fonts['Roboto-12-davysGrey']}>
                    {distributionChannel}
                  </StyledText>
                </Row>
                <Row>
                  <Image source={PinLocation} style={[styles.smallImage, { marginTop: 2 }]} />
                  <StyledText style={fonts['Roboto-12-davysGrey']}>
                    {location}
                  </StyledText>
                </Row>
              </Section>
            ) : (
              <Section style={styles.locationContainer}>
                <Image source={PinLocation} style={styles.smallImage} />
                <StyledText style={fonts['Roboto-12-davysGrey']}>
                  {location}
                </StyledText>
                <Image source={ShopIcon} style={styles.shopImage} />
                <StyledText style={fonts['Roboto-12-davysGrey']}>
                  {distributionChannel}
                </StyledText>
              </Section>
            )
          }
        </Section>
        <Section style={styles.arrowHolder}>
          <Icon size={18} name="chevron-forward-outline" />
        </Section>

      </Section>
    </TouchableOpacity>
  );
}
