const defaultState = {
  isLoading: false,
  error: null,
  errorRefresh: null,
  errorSubmit: null,
  isSuccessSubmit: false,
  payload: {},
  selectedShipment: null,
  currentShipments: {
    date: '',
    shipments: []
  },
  nextShipments: {
    date: '',
    shipments: []
  },
  reasons: []
};

export default function shipmentPlanReducer(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_SHIPMENTS_REQUEST': {
      return {
        ...state,
        isLoading: true
      };
    }
    case 'REFRESH_SHIPMENTS_REQUEST': {
      return {
        ...state,
        isRefreshing: true
      };
    }
    case 'REFRESH_SHIPMENTS_SUCCESS':
    case 'FETCH_SHIPMENTS_SUCCESS': {
      const { payload } = action;
      const { data } = payload;
      return {
        ...state,
        error: null,
        errorRefresh: null,
        errorSubmit: null,
        isRefreshing: false,
        payload: action.payload,
        currentShipments: data.currentShipments,
        nextShipments: data.nextShipments,
        isLoading: false,
        reasons: data.reasons
      };
    }
    case 'FETCH_SHIPMENTS_FAILED': {
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    }
    case 'REFRESH_SHIPMENTS_FAILED': {
      return {
        ...state,
        isRefreshing: false,
        errorRefresh: action.error
      };
    }
    case 'REHYDRATE': {
      return {
        ...action.savedState.shipmentPlanStore,
        isLoading: false
      };
    }
    case 'SELECT_SHIPMENT': {
      return {
        ...state,
        selectedShipment: action.selectedShipment
      };
    }
    case 'START_SHIPMENT': {
      const { currentShipments } = state;
      const { selectedShipment } = action;
      const newData = currentShipments.shipments.map((data) => {
        if (data.shipment_plan_number === selectedShipment) {
          return {
            ...data,
            shipment_in_progress: 1
          };
        } else {
          return data;
        }
      });
      return {
        ...state,
        selectedShipment: action.selectedShipment,
        currentShipments: {
          ...currentShipments,
          shipments: newData
        }
      };
    }
    case 'START_VISIT': {
      const { currentShipments, selectedShipment } = state;
      const { customerId } = action;
      const editedShipments = currentShipments.shipments.map((shipmentData) => {
        if (shipmentData.shipment_plan_number === selectedShipment) {
          return {
            ...shipmentData,
            customers: shipmentData.customers.map((custData) => {
              if (custData.shiptoparty_code === customerId) {
                return {
                  ...custData,
                  is_visited: true
                };
              } else {
                return custData;
              }
            })
          };
        } else {
          return shipmentData;
        }
      });
      return {
        ...state,
        currentShipments: {
          ...currentShipments,
          shipments: editedShipments
        }
      };
    }
    case 'LOGOUT': {
      return { ...defaultState };
    }
    case 'RESET_SUBMIT_STATUS': {
      return {
        ...state,
        errorSubmit: null,
        isSuccessSubmit: false
      };
    }
    case 'SUBMIT_DO_REQUEST': {
      return {
        ...state,
        errorSubmit: null,
        isSuccessSubmit: false,
        isLoadingSubmit: true
      };
    }
    case 'SET_SHIPMENT_STATUS': {
      const { currentShipments, selectedShipment } = state;
      const { customer } = action;
      const editedShipments = currentShipments.shipments.map((shipmentData) => {
        if (shipmentData.shipment_plan_number === selectedShipment) {
          return {
            ...shipmentData,
            customers: shipmentData.customers.map((custData) => {
              if (custData.shiptoparty_code === customer.shiptoparty_code) {
                const newDeliveries = custData.deliveries.map(delivery => customer.deliveries.find(item => item.do_no === delivery.do_no) || delivery);

                return {
                  ...customer,
                  deliveries: newDeliveries
                };
              } else {
                return custData;
              }
            })
          };
        } else {
          return shipmentData;
        }
      });

      return {
        ...state,
        isSuccessSubmit: true,
        currentShipments: {
          ...currentShipments,
          shipments: editedShipments
        }
      };
    }
    case 'SUBMIT_DO_FAILED': {
      return {
        ...state,
        errorSubmit: action.error,
        isSuccessSubmit: false
      };
    }
    default: {
      return state;
    }
  }
}
