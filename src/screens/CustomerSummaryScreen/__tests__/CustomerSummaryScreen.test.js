/**
 * @jest-environment jsdom
 */
import 'react-native';

import { mapStateToProps } from '../CustomerSummaryScreen';

describe('mapStateToProps', () => {
  const state = {
    customerListStore: {
      activeCustomer: {
        payment_types: [],
        deliveries: []
      }
    },
    shipmentPlanStore: {
      nextShipments: {
        shipments: []
      }
    }
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
  });

  test('initial props', () => {
    const propsState = mapStateToProps(state);

    expect(propsState).toEqual({
      customerData: {
        city: undefined,
        customerID: undefined,
        customerName: undefined,
        customerPhone: undefined,
        doCount: undefined,
        isCBD: false,
        isCOD: false,
        distChannel: undefined,
        isPickup: false,
        firstDeliveryId: '',
        isRedelivery: false,
        isReschedule: false,
        customerPhoto: undefined,
        pickupCount: undefined,
        salesman: undefined,
        salesmanPhone: undefined,
        streetName: undefined,
        isVisited: undefined,
        isCustPhoneAvail: false,
        isSalesPhoneAvail: false,
        shipmentId: undefined
      },
      isNextShipment: expect.any(Boolean)
    });
  });
});
