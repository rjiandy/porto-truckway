const initialState = {
  activeCustomerLists: [],
  selectedCustomer: '',
  activeCustomer: null,
  activeDO: null,
  currentTab: 0,
  updatePriceShipment: null,
  errorUpdate: false,
  isLoadingPrice: false
};

export default function customerListReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_SHIPMENT':
    case 'START_SHIPMENT': {
      return {
        ...state,
        activeCustomerLists: action.customers
      };
    }
    case 'REHYDRATE': {
      return {
        ...action.savedState.customerListStore,
        isLoading: false
      };
    }
    case 'SELECT_CUSTOMER': {
      const { activeCustomer } = action;
      const { shipment_status_customer } = activeCustomer;
      const { delivery, pickup } = shipment_status_customer;

      const [newDeliveries, newPickups] = [
        activeCustomer.deliveries.filter((data) => !data.is_pickup),
        activeCustomer.deliveries.filter((data) => data.is_pickup)
      ];

      let [modifiedDeliveries, modifiedPickups, currentTab] = [newDeliveries, newPickups, 0];

      if (delivery === 'PENDING') {
        modifiedDeliveries = newDeliveries.map((data) => ({ ...data, doc_sj_kembali: null }));
      } else if (delivery !== 'PENDING' && delivery != null) {
        const isAnyTrue = newDeliveries.findIndex(({ doc_sj_kembali }) => doc_sj_kembali);
        if (isAnyTrue > -1) {
          modifiedDeliveries = newDeliveries.map((data) => ({ ...data, doc_sj_kembali: 1 }));
        }
      } else {
        modifiedDeliveries = newDeliveries;
      }

      if (pickup === 'PENDING') {
        modifiedPickups = newPickups.map((data) => ({ ...data, doc_sj_kembali: null }));
      } else if (pickup !== 'PENDING' && pickup != null) {
        const isAnyTrue = newPickups.findIndex(({ doc_sj_kembali }) => doc_sj_kembali);
        if (isAnyTrue > -1) {
          modifiedPickups = newPickups.map((data) => ({ ...data, doc_sj_kembali: 1 }));
        }
      } else {
        modifiedPickups = newPickups;
      }

      if (delivery !== 'PENDING' && delivery != null && newPickups.length > 0) {
        currentTab = 1;
      }

      return {
        ...state,
        currentTab,
        selectedCustomer: action.selectedCustomer,
        activeCustomer: {
          ...action.activeCustomer,
          deliveries: [
            ...modifiedDeliveries,
            ...modifiedPickups
          ]
        }
      };
    }
    case 'SET_REDELIVERY': {
      const { activeCustomer } = state;
      const { deliveries } = activeCustomer;
      const { reason, isPickup } = action;
      let newDeliveries = [];
      if (isPickup) {
        newDeliveries = deliveries.map((deliveryData) => {
          if (deliveryData.is_pickup) {
            return {
              ...deliveryData,
              is_reschedule: true,
              do_status: 'FAILED',
              delivery_order_items: deliveryData.delivery_order_items.map((materialData) => { // TODO later take out and build helpers
                return {
                  ...materialData,
                  reason_id: reason,
                  qty_received: 0,
                  uom_received: materialData.product_uom,
                  qty_conversion: materialData.quantity,
                  uom_conversion: materialData.product_uom,
                  qty_difference: materialData.quantity,
                  uom_difference: null
                };
              })
            };
          }
          return deliveryData;
        });
      } else {
        newDeliveries = deliveries.map((deliveryData) => {
          if (!deliveryData.is_pickup) {
            return {
              ...deliveryData,
              is_redelivery: true,
              do_status: 'FAILED',
              delivery_order_items: deliveryData.delivery_order_items.map((materialData) => { // TODO later take out and build helpers
                return {
                  ...materialData,
                  reason_id: reason,
                  qty_received: 0,
                  uom_received: materialData.product_uom,
                  qty_conversion: materialData.quantity,
                  uom_conversion: materialData.product_uom,
                  qty_difference: materialData.quantity,
                  uom_difference: null
                };
              })
            };
          }
          return deliveryData;
        });
      }

      return {
        ...state,
        activeCustomer: {
          ...activeCustomer,
          deliveries: newDeliveries
        }
      };
    }
    case 'SELECT_DO': {
      return {
        ...state,
        activeDO: action.activeDO
      };
    }
    case 'SET_REDELIVERY': {
      const { activeCustomer } = state;
      const { deliveries } = activeCustomer;
      const { reason } = action;
      const newDeliveries = deliveries.map((deliveryData) => {
        return {
          ...deliveryData,
          is_redelivery: true,
          do_status: 'FAILED',
          delivery_order_items: deliveryData.delivery_order_items.filter((data) => !data.is_pickup).map((materialData) => { // TODO later take out and build helpers
            return {
              ...materialData,
              reason_id: reason,
              qty_received: 0,
              uom_received: materialData.product_uom,
              qty_conversion: materialData.quantity,
              uom_conversion: materialData.product_uom
            };
          })
        };
      });
      return {
        ...state,
        activeCustomer: {
          ...activeCustomer,
          deliveries: newDeliveries
        }
      };
    }
    case 'START_VISIT': {
      const { activeCustomerLists } = state;
      const { customerId } = action;
      const newCustomerList = activeCustomerLists.map((data) => {
        if (data.shiptoparty_code === customerId) {
          return {
            ...data,
            is_visited: true
          };
        } else {
          return data;
        }
      });
      return {
        ...state,
        activeCustomerLists: newCustomerList,
        activeCustomer: {
          ...state.activeCustomer,
          is_visited: true
        }
      };
    }
    case 'SET_DO_STATUS': {
      const { activeCustomer } = state;
      const { deliveries } = activeCustomer;
      const { status, doNumber, reason } = action;

      const newDeliveries = deliveries.map((deliveryData) => {
        if (deliveryData.do_no === doNumber) {
          return {
            ...deliveryData,
            do_status: status,
            is_redelivery: false,
            delivery_order_items: deliveryData.delivery_order_items.map((materialData) => { // TODO later take out and build helpers
              return {
                ...materialData,
                reason_id: reason,
                qty_received: status === 'SUCCESS' ? materialData.quantity : 0,
                uom_received: materialData.product_uom,
                qty_conversion: materialData.quantity,
                uom_conversion: materialData.product_uom,
                qty_difference: status === 'SUCCESS' ? 0 : materialData.quantity,
                uom_difference: null
              };
            })
          };
        } else {
          return {
            ...deliveryData,
            do_status: deliveryData.is_redelivery ? 'PENDING' : deliveryData.do_status,
            is_redelivery: false
          };
        }
      });

      return {
        ...state,
        activeCustomer: {
          ...activeCustomer,
          deliveries: newDeliveries
        }
        // TODO: change after submit
      };
    }
    case 'SET_DOCUMENT_SJ': {
      const { activeCustomer } = state;
      const { isPickup, status } = action;

      if (isPickup) {
        const newDeliveries = activeCustomer.deliveries.map((data) => {
          if (data.is_pickup) {
            return {
              ...data,
              doc_sj_kembali: status ? 1 : 0
            };
          } else {
            return data;
          }
        });
        return {
          ...state,
          activeCustomer: {
            ...activeCustomer,
            deliveries: newDeliveries
          }
        };
      } else {
        const newDeliveries = activeCustomer.deliveries.map((data) => {
          if (!data.is_pickup) {
            return {
              ...data,
              doc_sj_kembali: status ? 1 : 0
            };
          } else {
            return data;
          }
        });
        return {
          ...state,
          activeCustomer: {
            ...activeCustomer,
            deliveries: newDeliveries
          }
        };
      }
    }
    case 'SET_DELIVERIES': {
      const { activeCustomer } = state;
      const { deliveries } = activeCustomer;
      const { deliveryData, doNumber, status } = action;

      const newDeliveries = deliveries.map(deliveryItem => {
        if (deliveryItem.do_no === doNumber) {
          return {
            ...deliveryItem,
            delivery_order_items: deliveryData,
            do_status: status
          };
        }
        return deliveryItem;
      });

      return {
        ...state,
        activeCustomer: {
          ...activeCustomer,
          deliveries: newDeliveries
        }
      };
    }
    case 'SET_SHIPMENT_STATUS' : {
      const { activeCustomerLists, selectedCustomer } = state;
      const { customer } = action;
      const editActiveCustomerList = activeCustomerLists.map(customerData => {
        if (customerData.shiptoparty_code === customer.shiptoparty_code) {
          const newDeliveries = customerData.deliveries.map(delivery => customer.deliveries.find(item => item.do_no === delivery.do_no) || delivery);
          const newCustomerData = {
            ...customer,
            deliveries: newDeliveries
          };

          return newCustomerData;
        }

        return customerData;
      });
      const activeCustomer = editActiveCustomerList.find(item => item.shiptoparty_code === selectedCustomer);

      return {
        ...state,
        activeCustomerLists: editActiveCustomerList,
        activeCustomer
      };
    }
    case 'SELECT_CURRENT_TAB': {
      return {
        ...state,
        currentTab: action.currentTab
      };
    }
    case 'GET_FINAL_PRICE_REQUEST' : {
      return {
        ...state,
        isLoadingPrice: true
      };
    }
    case 'GET_FINAL_PRICE_SUCCESS' : {
      return {
        ...state,
        isLoadingPrice: false,
        updatePriceShipment: {
          ...action.payload
        }
      };
    }
    case 'GET_FINAL_PRICE_FAILED' : {
      const { activeCustomer } = state;

      const newDeliveries = activeCustomer.deliveries.map(delivery => {
        const newOrderItems = delivery.delivery_order_items.map(item => {
          return {
            ...item,
            final_prices_material_online: null
          };
        });
        return {
          ...delivery,
          delivery_order_items: newOrderItems,
          amounts_source: 'TRUCKWAY'
        };
      });

      return {
        ...state,
        errorUpdate: true,
        isLoadingPrice: false,
        activeCustomer: {
          ...activeCustomer,
          deliveries: newDeliveries
        }
      };
    }
    case 'RESET_UPDATE_PRICE' : {
      return {
        ...state,
        errorUpdate: false,
        updatePriceShipment: initialState.updatePriceShipment
      };
    }
    default: {
      return state;
    }
  }
}
