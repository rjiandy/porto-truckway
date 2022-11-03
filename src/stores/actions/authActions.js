import { ToastAndroid } from 'react-native';

import login from '../../api/authApi';

export default function fetchLogin(username, password) {
  return async (dispatch) => {
    dispatch({
      type: 'FETCH_LOGIN_REQUEST'
    });

    try {
      const result = await login(username, password);

      if (!result.success) {
        dispatch({
          type: 'FETCH_LOGIN_FAILED',
          error: result
        });
      } else {
        dispatch({
          type: 'FETCH_LOGIN_SUCCESS',
          payload: result
        });
      }
    } catch (err) {
      dispatch({
        type: 'FETCH_LOGIN_FAILED',
        error: err
      });
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };
}
