import { combineReducers } from 'redux';

import authStoreReducer from './authStoreReducer';
import shipmentPlanReducer from './shipmentPlanReducer';
import offlineReducer from './offlineReducer';
import customerListReducer from './customerListReducer';
import submitReducer from './submitReducer';

const reducers = {
  authStore: authStoreReducer,
  shipmentPlanStore: shipmentPlanReducer,
  customerListStore: customerListReducer,
  offlineStore: offlineReducer,
  submitStore: submitReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
