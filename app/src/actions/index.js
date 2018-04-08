import { push } from 'react-router-redux';

import * as actionTypes from '../utils/actionTypes';

import * as apiClient from '../apiClient';

// const API_URL = document.getElementById('REACT_APP_API_URL') &&  document.getElementById('REACT_APP_API_URL').value;

function fetchLoginRequest(username, password) {
  return {
    type: actionTypes.FETCH_LOGIN_REQUEST,
    username,
    password
  };
}

function fetchLoginSuccess(accessToken) {
  return {
    type: actionTypes.FETCH_LOGIN_SUCCESS,
    accessToken
  };
}

function fetchLoginFailure(error) {
  return {
    type: actionTypes.FETCH_LOGIN_FAILURE,
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

        onFailure: function(error) {
          console.log(error);
          dispatch(fetchLoginFailure(error));
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
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
  if (state.authenticator.isLogined) {
    return false;
  } else if (state.authenticator.isFetching) {
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
