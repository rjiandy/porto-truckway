/**
 * @jest-environment jsdom
 */
import 'react-native';

import { mapStateToProps } from '../HomeScreen';

describe('mapStateToProps', () => {
  const state = {
    offlineStore: {},
    shipmentPlanStore: {
      isLoading: false,
      currentShipments: {
        shipments: []
      },
      isRefreshing: false,
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
      currentShipments: expect.any(Array),
      isLoading: expect.any(Boolean),
      isRefreshing: expect.any(Boolean),
      nextShipments: expect.any(Array),
      shipmentPlanStore: state.shipmentPlanStore
    });
  });
});
