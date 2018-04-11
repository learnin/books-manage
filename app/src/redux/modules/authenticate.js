import { push } from 'react-router-redux';
import * as apiClient from '../../apiClient';

export const LOGIN_REQUEST = 'books-manage/authenticate/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'books-manage/authenticate/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'books-manage/authenticate/LOGIN_FAILURE';

const initialState = {
  accessToken: '',
  isFetching: false,
  isLogined: false,
  message: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        isFetching: false,
        isLogined: true,
        message: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.error.message
      };
    default:
      return state;
  }
}

function fetchLoginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  };
}

function fetchLoginSuccess(accessToken) {
  return {
    type: LOGIN_SUCCESS,
    accessToken
  };
}

function fetchLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

function fetchLogin(username, password) {
  return dispatch => {
    dispatch(fetchLoginRequest(username, password));

    apiClient.authenticateUser(username, password, {
      onSuccess: function (result) {
        console.log('access token: ' + result.getIdToken().getJwtToken());

        dispatch(fetchLoginSuccess(result.getIdToken().getJwtToken()));
        dispatch(push('/hello'));
      },

      onFailure: function (error) {
        console.log(error);
        dispatch(fetchLoginFailure(error));
      },

      newPasswordRequired: function (userAttributes, requiredAttributes) {
        console.log('newPasswordRequired');
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // Get these details and call
        //            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
      }
    });
  };
}

function shouldFetchLogin(state) {
  if (state.authenticate.isLogined) {
    return false;
  } else if (state.authenticate.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchLoginIfNeeded(username, password) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchLogin(username, password));
    } else {
      // Let the calling code know there's nothing to wait for.
      // FIXME:
      // return Promise.resolve()
    }
  };
}
