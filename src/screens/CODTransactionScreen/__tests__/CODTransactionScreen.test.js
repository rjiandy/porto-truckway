/**
 * @jest-environment jsdom
 */
import 'react-native';

import { mapStateToProps } from '../CODTransactionScreen';

describe('mapStateToProps', () => {
  const state = {
    customerListStore: {
      activeCustomer: {
        deliveries: []
      }
    }
  };

  test('initial props', () => {
    const propsState = mapStateToProps(state);

    expect(propsState).toStrictEqual(
      expect.objectContaining({
        customer: expect.any(Object),
        deliveries: expect.any(Array)
      }),
    );
  });
});
