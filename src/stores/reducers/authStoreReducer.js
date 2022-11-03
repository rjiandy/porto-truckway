const defaultState = {
  payload: {},
  isLoading: false,
  error: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'FETCH_LOGIN_REQUEST': {
      return {
        ...state,
        isLoading: true
      };
    }

    case 'FETCH_LOGIN_SUCCESS': {
      return {
        ...state,
        payload: action.payload,
        isLoading: false
      };
    }

    case 'FETCH_LOGIN_FAILED': {
      return {
        ...state,
        payload: {},
        error: action.error,
        isLoading: false
      };
    }
    case 'LOGOUT': {
      return { ...defaultState };
    }
    default:
      return state;
  }
};
