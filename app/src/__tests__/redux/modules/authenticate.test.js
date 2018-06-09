import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as authenticateActions from '../../../redux/modules/authenticate';

jest.mock('amazon-cognito-identity-js');

const cognitoIdentityServiceProvider = require('amazon-cognito-identity-js');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const createMockStore = () =>
  mockStore({
    authenticate: {
      accessToken: '',
      isFetching: false,
      isLogined: false,
      message: ''
    }
  });

describe('requestLogin', () => {
  it('creates RECEIVE_LOGIN when input correct account', () => {
    const username =
      cognitoIdentityServiceProvider.__test__correctUserAccount.username;
    const password =
      cognitoIdentityServiceProvider.__test__correctUserAccount.password;
    const expectedActions = [
      {
        type: authenticateActions.LOGIN_REQUEST,
        payload: {
          username,
          password
        }
      },
      {
        type: authenticateActions.LOGIN_SUCCESS,
        payload: {
          accessToken:
            cognitoIdentityServiceProvider.__test__correctUserAccount
              .accessToken
        }
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/hello'],
          method: 'push'
        }
      }
    ];
    const store = createMockStore();

    store.dispatch(authenticateActions.fetchLoginIfNeeded(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_LOGIN_FAILURE when input wrong password', () => {
    const username =
      cognitoIdentityServiceProvider.__test__correctUserAccount.username;
    const password = 'wrong_password';
    const expectedActions = [
      {
        type: authenticateActions.LOGIN_REQUEST,
        payload: {
          username,
          password
        }
      },
      {
        type: authenticateActions.LOGIN_FAILURE,
        payload: cognitoIdentityServiceProvider.__test__errorOnAuthenticate,
        error: true
      }
    ];
    const store = createMockStore();

    store.dispatch(authenticateActions.fetchLoginIfNeeded(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
