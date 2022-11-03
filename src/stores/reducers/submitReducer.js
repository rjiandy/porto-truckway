const defaultState = {
  mainQueue: [],
  activeShipment: {
    activeShipmentNumber: '',
    payload: null
  },
  activeVisit: {
    selectedCustomer: '',
    payload: null
  },
  customerVisit: null
};

export default function submitReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SHIPMENT_PROGRESS': {
      const { payload } = action;
      return {
        ...state,
        activeShipment: {
          activeShipmentNumber: payload.shipment_plan_number,
          payload: action.payload
        }
      };
    }

    case 'CUSTOMER_VISIT': {
      const { payload } = action;
      return {
        ...state,
        activeVisit: {
          payload,
          selectedCustomer: payload.customer_id
        }
      };
    }

    case 'UPDATE_QUEUE': {
      const { queue } = action;
      return {
        ...state,
        mainQueue: queue
      };
    }

    case 'SUBMIT_SUCCESS': {
      const { key } = action;
      const { mainQueue } = state;
      return {
        ...state,
        mainQueue: mainQueue.map((data) => {
          if (data.key === key) {
            return {
              ...data,
              status: 'SUCCESS'
            };
          } else {
            return data;
          }
        })
      };
    }
    case 'SUBMIT_FAILED': {
      const { key, errorMessage } = action;
      const { mainQueue } = state;
      return {
        ...state,
        mainQueue: mainQueue.map((data) => {
          if (data.key === key) {
            return {
              ...data,
              status: 'FAILED',
              error: errorMessage
            };
          } else {
            return data;
          }
        })
      };
    }
    case 'REHYDRATE': {
      return {
        ...action.savedState.submitStore
      };
    }
    default: {
      return state;
    }
  }
}
