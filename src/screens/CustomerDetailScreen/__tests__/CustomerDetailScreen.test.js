/**
 * @jest-environment jsdom
 */
import 'react-native';

import { mapStateToProps } from '../CustomerDetailScreen';

describe('mapStateToProps', () => {
  const state = {
    customerListStore: {
      activeCustomer: {
        shipment_status_customer: {
          delivery: 'PENDING',
          pickup: 'PENDING'
        },
        payment_types: [],
        deliveries: []
      }
    },
    shipmentPlanStore: {}
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
  });

  test('initial props', () => {
    const propsState = mapStateToProps(state);

    expect(propsState).toEqual({
      activeCustomer: {
        shipment_status_customer: {
          delivery: 'PENDING',
          pickup: 'PENDING'
        },
        deliveries: [],
        payment_types: []
      },
      currentTab: undefined,
      customerData: {
        city: undefined,
        customerID: undefined,
        customerName: undefined,
        customerPhone: undefined,
        doCount: undefined,
        isCBD: false,
        isCOD: false,
        isCustPhoneAvail: false,
        isDeliverySJCompleted: false,
        isPickup: false,
        isPickupSJCompleted: false,
        isRedelivery: false,
        isRedeliveryDO: false,
        isReschedule: false,
        isSalesPhoneAvail: false,
        pickupCount: undefined,
        salesman: undefined,
        salesmanPhone: undefined,
        streetName: undefined
      },
      doList: [],
      errorSubmit: undefined,
      isLoadingPrice: undefined,
      isPickupEnabled: false,
      isSuccessSubmit: undefined,
      reasons: undefined
    });
  });
});
