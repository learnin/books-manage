import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../actions';
import * as actionTypes from '../../utils/actionTypes';

jest.mock('amazon-cognito-identity-js');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  authenticator: {
    accessToken: '',
    isFetching: false,
    isLogined: false
  }
});

describe('requestLogin', () => {
  it('creates RECEIVE_LOGIN when fetching login', () => {
    const username = 'username';
    const password = 'password';
    const accessToken = 'accessToken';
    const expectedActions = [{
      type: actionTypes.REQUEST_LOGIN,
      username,
      password
    }, {
      type: actionTypes.RECEIVE_LOGIN,
      accessToken
    }, {
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: ['/hello'],
        method: 'push'
      }
    }];
    
    store.dispatch(actions.fetchLoginIfNeeded(username, password));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
