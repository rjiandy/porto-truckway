const defaultState = {
  uniqueIdentifier: Math.random() * 12000,
  shouldGetNewData: false,
  isRefreshing: false
};


export default function offlineReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_NEW_DATA': {
      return {
        ...state,
        shouldGetNewData: true
      };
    }
    case 'FETCH_LOGIN_SUCCESS': {
      return {
        ...state,
        uniqueIdentifier: Math.random() * 12000,
        shouldGetNewData: true
      };
    }
    case 'FETCH_SHIPMENTS_SUCCESS': {
      return {
        ...state,
        uniqueIdentifier: Math.random() * 12000,
        shouldGetNewData: false
      };
    }
    case 'REFRESH_SHIPMENTS_REQUEST': {
      return {
        ...state,
        isRefreshing: true
      };
    }
    case 'REFRESH_SHIPMENTS_SUCCESS': {
      return {
        ...state,
        isRefreshing: false,
        uniqueIdentifier: Math.random() * 12000,
        shouldGetNewData: false
      };
    }
    case 'REHYDRATE': {
      return {
        ...action.savedState.offlineStore
      };
    }
    case 'LOGOUT': {
      return {
        ...defaultState
      };
    }
    default: {
      return {
        ...state,
        uniqueIdentifier: Math.random() * 12000
      };
    }
  }
}
