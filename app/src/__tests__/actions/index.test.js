import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../actions';
import * as actionTypes from '../../utils/actionTypes';

jest.mock('amazon-cognito-identity-js');

const cognitoIdentityServiceProvider = require('amazon-cognito-identity-js');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('requestLogin', () => {
  it('creates RECEIVE_LOGIN when input correct account', () => {
    const username = cognitoIdentityServiceProvider.__test__correctUserAccount.username;
    const password = cognitoIdentityServiceProvider.__test__correctUserAccount.password;
    const expectedActions = [{
      type: actionTypes.FETCH_LOGIN_REQUEST,
      username,
      password
    }, {
      type: actionTypes.FETCH_LOGIN_SUCCESS,
      accessToken: cognitoIdentityServiceProvider.__test__correctUserAccount.accessToken
    }, {
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: ['/hello'],
        method: 'push'
      }
    }];
    const store = mockStore({
      authenticator: {
        accessToken: '',
        isFetching: false,
        isLogined: false
      }
    });

    store.dispatch(actions.fetchLoginIfNeeded(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_LOGIN_FAILURE when input wrong password', () => {
    const username = cognitoIdentityServiceProvider.__test__correctUserAccount.username;
    const password = 'wrong_password';
    const expectedActions = [{
      type: actionTypes.FETCH_LOGIN_REQUEST,
      username,
      password
    }, {
      type: actionTypes.FETCH_LOGIN_FAILURE,
      error: cognitoIdentityServiceProvider.__test__errorOnAuthenticate
    }];
    const store = mockStore({
      authenticator: {
        accessToken: '',
        isFetching: false,
        isLogined: false
      }
    });

    store.dispatch(actions.fetchLoginIfNeeded(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
