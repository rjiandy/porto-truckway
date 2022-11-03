import getShipmentPlan, { getShipmentFinalPrice } from '../../api/shipmentPlanApi';

import getCurrentLocation from '../../utils/getCurrentLocation';


export function saveCustomerVisit(payload) {
  return async (dispatch) => {
    let [latitude, longitude] = ['', ''];
    try {
      const latestLocation = await getCurrentLocation();
      if (latestLocation && latestLocation.coords) {
        const { latitude: latTemp, longitude: longTemp } = latestLocation.coords;
        latitude = latTemp.toString();
        longitude = longTemp.toString();
      }
    } catch (err) {
      console.log('error getting location');
    } finally {
      dispatch({
        type: 'CUSTOMER_VISIT',
        payload: {
          ...payload,
          latitude,
          longitude,
          timestamp: new Date()
        }
      });
    }
  };
}

export function saveShipmentProgress(payload) {
  return async (dispatch) => {
    let [latitude, longitude] = ['', ''];
    try {
      const latestLocation = await getCurrentLocation();
      if (latestLocation && latestLocation.coords) {
        const { latitude: latTemp, longitude: longTemp } = latestLocation.coords;
        latitude = latTemp.toString();
        longitude = longTemp.toString();
      }
    } catch (err) {
      console.log('error getting location');
    } finally {
      dispatch({
        type: 'SHIPMENT_PROGRESS',
        payload: {
          ...payload,
          latitude,
          longitude,
          timestamp: new Date()
        }
      });
    }
  };
}

export default function getShipmentAction() {
  return async (dispatch) => {
    dispatch({
      type: 'FETCH_SHIPMENTS_REQUEST'
    });

    try {
      const result = await getShipmentPlan();
      if (!result.success) {
        dispatch({
          type: 'FETCH_SHIPMENTS_FAILED',
          error: result
        });
      } else {
        dispatch({
          type: 'FETCH_SHIPMENTS_SUCCESS',
          payload: result
        });
      }
    } catch (error) {
      dispatch({
        type: 'FETCH_SHIPMENTS_FAILED',
        error
      });
    }
  };
}

export function refreshShipmentAction() {
  return async (dispatch) => {
    dispatch({
      type: 'REFRESH_SHIPMENTS_REQUEST'
    });

    try {
      const result = await getShipmentPlan();
      if (!result.success) {
        throw result;
      }
      dispatch({
        type: 'REFRESH_SHIPMENTS_SUCCESS',
        payload: result
      });
    } catch (error) {
      dispatch({
        type: 'REFRESH_SHIPMENTS_FAILED',
        error
      });
    }
  };
}

export function submitDoAction(imageData, payload, isPickup) {
  return async (dispatch) => {
    dispatch({
      type: 'SUBMIT_DO_REQUEST',
      imageData,
      payload,
      isPickup
    });

    // try {
    //   if (imageData) {
    //     const base64File = await uploadFileBase64({
    //       base64image: imageData,
    //       folder_path: 'esign'
    //     });
    //     if (base64File.status === 200) {
    //       const result = await submitDoApi({
    //         ...payload,
    //         e_sign: base64File.data.url
    //       });
    //       if (result.success) {
    //         dispatch({
    //           type: 'SUBMIT_DO_SUCCESS',
    //           ...payload
    //         });
    //       } else {
    //         dispatch({
    //           type: 'SUBMIT_DO_FAILED',
    //           error: result.data
    //         });
    //       }
    //     } else {
    //       dispatch({
    //         type: 'SUBMIT_DO_FAILED',
    //         error: 'failed upload esign'
    //       });
    //     }
    //   } else {
    //     const result = await submitDoApi({
    //       ...payload,
    //       e_sign: ''
    //     });

    //     if (result.success) {
    //       dispatch({
    //         type: 'SUBMIT_DO_SUCCESS',
    //         ...payload
    //       });
    //     } else {
    //       dispatch({
    //         type: 'SUBMIT_DO_FAILED',
    //         error: result.data
    //       });
    //     }
    //   }
    // } catch (error) {
    //   dispatch({
    //     type: 'SUBMIT_DO_FAILED',
    //     error
    //   });
    // }
  };
}

export function getFinalPriceAction(payload) {
  return async (dispatch) => {
    dispatch({
      type: 'GET_FINAL_PRICE_REQUEST'
    });

    try {
      const result = await getShipmentFinalPrice(payload);
      if (!result.success) {
        throw result.message;
      }
      dispatch({
        type: 'GET_FINAL_PRICE_SUCCESS',
        payload: result.data
      });
    } catch (error) {
      dispatch({
        type: 'GET_FINAL_PRICE_FAILED',
        error
      });
    }
  };
}
