/**
 * @jest-environment jsdom
 */
import 'react-native';

import { mapStateToProps } from '../CustomerListScreen';

describe('mapStateToProps', () => {
  const state = {
    customerListStore: {
      activeCustomerLists: [],
      activeCustomer: {
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
      customerLists: expect.any(Array),
      shipmentPlanNumber: undefined
    });
  });
});
