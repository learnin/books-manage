import * as actionTypes from '../utils/actionTypes';

const initialLoginState = {
  accessToken: '',
  isLogined: false
};

const authenticator = (state = initialLoginState, action) => {
  if (action.type === actionTypes.LOGIN) {
    console.log('username: ' + action.username + ', password: ' + action.password);
    return state;
  } else {
    return state;
  }
};

export default authenticator;
