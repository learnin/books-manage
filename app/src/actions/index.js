import { push } from 'react-router-redux';

import * as actionTypes from '../utils/actionTypes';

const API_URL = document.getElementById('REACT_APP_API_URL').value;

var cognitoIdentityServiceProvider = require('amazon-cognito-identity-js');

function requestLogin(username, password) {
  return {
    type: actionTypes.REQUEST_LOGIN,
    username,
    password
  }
}

function receiveLogin(accessToken) {
  return {
    type: actionTypes.RECEIVE_LOGIN,
    accessToken
  }
}

function fetchLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username, password));

    var authenticationData = {
        Username : username,
        Password : password
    };
    var authenticationDetails = new cognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : document.getElementById('REACT_APP_AWS_COGNITO_USER_POOL_ID').value,
        ClientId : document.getElementById('REACT_APP_AWS_COGNITO_CLIENT_ID').value
    };
    var userPool = new cognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : authenticationData.Username,
        Pool : userPool
    };
    var cognitoUser = new cognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log('access token: ' + result.getAccessToken().getJwtToken());
          
          // //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          // AWS.config.region = '<region>';

          // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          //     IdentityPoolId : '...', // your identity pool id here
          //     Logins : {
          //         // Change the key below according to the specific region your user pool is in.
          //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
          //     }
          // });

          // // Instantiate aws sdk service objects now that the credentials have been updated.
          // // example: var s3 = new AWS.S3();

          // dispatch(receiveLogin(result.getAccessToken().getJwtToken()));
          dispatch(receiveLogin(result.getIdToken().getJwtToken()));
          dispatch(push('/hello'));
        },

        onFailure: function(err) {
          console.log(err);
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
  }
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
      return dispatch(fetchLogin(username, password))
    } else {
      // Let the calling code know there's nothing to wait for.
      // FIXME:
      // return Promise.resolve()
    }
  }
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
  }
}

export function hello() {
  return (dispatch, getState) => {
    return dispatch(fetchHello(getState()));
  };
}
