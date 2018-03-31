import { push } from 'react-router-redux';

import * as actionTypes from '../utils/actionTypes';

const API_URL = document.getElementById('REACT_APP_API_URL') &&  document.getElementById('REACT_APP_API_URL').value;

const cognitoIdentityServiceProvider = require('amazon-cognito-identity-js');

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

    const authenticationData = {
        Username : username,
        Password : password
    };
    const authenticationDetails = new cognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    const poolData = {
        UserPoolId : document.getElementById('REACT_APP_AWS_COGNITO_USER_POOL_ID') && document.getElementById('REACT_APP_AWS_COGNITO_USER_POOL_ID').value,
        ClientId : document.getElementById('REACT_APP_AWS_COGNITO_CLIENT_ID') && document.getElementById('REACT_APP_AWS_COGNITO_CLIENT_ID').value
    };
    const userPool = new cognitoIdentityServiceProvider.CognitoUserPool(poolData);
    const userData = {
        Username : authenticationData.Username,
        Pool : userPool
    };
    const cognitoUser = new cognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log('access token: ' + result.getIdToken().getJwtToken());
          
          dispatch(fetchLoginSuccess(result.getIdToken().getJwtToken()));
          dispatch(push('/hello'));
        },

        onFailure: function(err) {
          console.log(err);
          dispatch(fetchLoginFailure(err));
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

function fetchHello(state) {
  return dispatch => {
    fetch(API_URL + 'hello', {
      headers: new Headers({
        'Authorization': state.authenticator.accessToken
      })
    }).then((response) => {
      console.log(response);
    });
  };
}

export function hello() {
  return (dispatch, getState) => {
    return dispatch(fetchHello(getState()));
  };
}

function doCreateBook(state) {
  return dispatch => {
    fetch(API_URL + 'books', {
      method: 'POST',
      headers: {
        'Authorization': state.authenticator.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isbn: '9784274217883',
        name: 'テスト駆動開発',
        author: 'Kent Beck 著／和田 卓人　訳'
      })
    }).then((response)=> response.json())
    .then(console.log)
    .catch(console.error);
  };
}

export function createBook() {
  return (dispatch, getState) => {
    return dispatch(doCreateBook(getState()));
  };
}

function fetchBooks(state) {
  return dispatch => {
    fetch(API_URL + 'books', {
      headers: {
        'Authorization': state.authenticator.accessToken
      }
    }).then((response)=> response.json())
    .then(console.log)
    .catch(console.error);
  };
}

export function listBooks() {
  return (dispatch, getState) => {
    return dispatch(fetchBooks(getState()));
  };
}
