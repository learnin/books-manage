import * as actionTypes from '../utils/actionTypes';

const initialLoginState = {
  accessToken: '',
  isFetching: false,
  isLogined: false
};

const authenticator = (state = initialLoginState, action) => {
  if (action.type === actionTypes.REQUEST_LOGIN) {
    return {
      ...state,
      isFetching: true
    };
  } else if (action.type === actionTypes.RECEIVE_LOGIN) {
    return {
      ...state,
      accessToken: action.accessToken,
      isFetching: false,
      isLogined: true
    };
  } else {
    return state;
  }
};

export default authenticator;
