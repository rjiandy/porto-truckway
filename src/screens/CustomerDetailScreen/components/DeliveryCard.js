import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import Swipeable from 'react-native-swipeable';
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet
} from 'react-native';

import {
  Section,
  StyledText,
  Row,
  CustomIcon,
  Col,
  PrimaryButton,
  Icon
} from '../../../components';

import { getCustomerTag } from '../../CustomerListScreen/components/CustomerCard';

import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  doCardContainer: {
    borderWidth: 1,
    borderColor: colors.gainsboro,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 10,
    marginHorizontal: 14,
    borderRadius: 6,
    backgroundColor: colors.white
  },
  swipeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    backgroundColor: colors.emerald,
    marginBottom: 10,
    borderRadius: 6
  }
});

const ConditionalSwiperWrapper = ({ enabledSwipe, wrapper, children }) => {
  return (
    enabledSwipe ? wrapper(children) : children
  );
};

const RenderRightActions = () => {
  return (
    <Section style={[styles.swipeContent, { backgroundColor: colors.emerald, marginLeft: -10, marginRight: 14 }]}>
      <Icon name="md-checkmark" size={24} color={colors.white} />
    </Section>
  );
};

const RenderLeftActions = () => {
  return (
    <Section style={[styles.swipeContent, { backgroundColor: colors.maximumRed, marginRight: -10, marginLeft: 14 }]}>
      <Icon name="md-close" size={24} color={colors.white} />
    </Section>
  );
};

export default function DeliveryCard(props) {
  const {
    onFailedSwipe,
    onSuccessSwipe,
    enableSwipe,
    selectDO
  } = props;

  const swipeRef = useRef();

  const { doData, currentTab } = props;
  const PaymentTag = (type) => {
    if (type === 'COD' || type === 'CASH') {
      return getCustomerTag('COD');
    } else if (type.includes('CBD') || type === 'CBD') {
      return getCustomerTag('CBD');
    } else {
      return null;
    }
  };

  const closeHandler = () => {
    if (swipeRef !== null) {
      setTimeout(() => {
        if (swipeRef) {
          swipeRef.current.close();
        }
      }, 500);
    }
  };

  return (
    <>
      <ConditionalSwiperWrapper
        enabledSwipe={enableSwipe}
        wrapper={children => (
          <Swipeable
            ref={swipeRef}
            onSwipeableLeftOpen={onFailedSwipe}
            onSwipeableRightOpen={onSuccessSwipe}
            onSwipeableOpen={() => closeHandler()}
            renderLeftActions={RenderLeftActions}
            renderRightActions={RenderRightActions}
          >
            {children}
          </Swipeable>
        )}
      >
        <Section style={styles.doCardContainer}>
          <Row>
            <Col style={{ flex: 1 }}>
              <Section style={{ flexWrap: 'wrap' }}>
                {PaymentTag(doData.payment_type)}
              </Section>
              <Row>
                {/* deliveryIconStatus: 'SUCCESS' | 'PARTIAL' | 'FAILED' | null | 'REDELIVERY' */}
                <CustomIcon
                  status={doData.is_redelivery || doData.is_reschedule ? 'REDELIVERY' : doData.do_status}
                  type={currentTab === 0 ? 'deliveryIcon' : 'pickupIcon'}
                  height={24}
                  width={24}
                />
                <Col style={{ paddingLeft: 8 }}>
                  <StyledText>DO No.</StyledText>
                  <StyledText>{doData.do_no}</StyledText>
                </Col>
              </Row>
            </Col>
            <Col style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <PrimaryButton
                label="Detail"
                invert
                onPress={() => {
                  selectDO(doData);
                  Actions.materialListScreen();
                }}
                disabled={!enableSwipe || doData.is_redelivery}
                customStyles={{
                  width: 72,
                  height: 32
                }}
              />
            </Col>
          </Row>
        </Section>
      </ConditionalSwiperWrapper>
    </>
  );
}
