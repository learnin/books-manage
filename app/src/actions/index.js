import * as actionTypes from '../utils/actionTypes';

export const login = (username, password) => ({
  type: actionTypes.LOGIN,
  username,
  password
});
