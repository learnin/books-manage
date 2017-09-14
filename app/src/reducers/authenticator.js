import * as actionTypes from '../utils/actionTypes';

const initialLoginState = {
  accessToken: '',
  isFetching: false,
  isLogined: false,
  message: ''
};

const authenticator = (state = initialLoginState, action) => {
  if (action.type === actionTypes.FETCH_LOGIN_REQUEST) {
    return {
      ...state,
      isFetching: true
    };
  } else if (action.type === actionTypes.FETCH_LOGIN_SUCCESS) {
    return {
      ...state,
      accessToken: action.accessToken,
      isFetching: false,
      isLogined: true,
      message: ''
    };
  } else if (action.type === actionTypes.FETCH_LOGIN_FAILURE) {
    return {
      ...state,
      isFetching: false,
      message: action.error.message
    };
  } else {
    return state;
  }
};

export default authenticator;
