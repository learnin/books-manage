'use strict';

const cognitoIdentityServiceProvider = jest.genMockFromModule('amazon-cognito-identity-js');

class AuthenticationDetails {
  constructor(authenticationData) {
  }
}

class CognitoUserPool {
  constructor(poolData) {
  }
}

class CognitoUser {
  constructor(userData) {
    return {
      authenticateUser: function(authenticationDetails, callback) {
        return callback.onSuccess({
          getIdToken: function() {
            return {
              getJwtToken: function() {
                return 'accessToken';
              }
            };
          }
        });
      }
    };
  }
}

cognitoIdentityServiceProvider.AuthenticationDetails = AuthenticationDetails;
cognitoIdentityServiceProvider.CognitoUserPool = CognitoUserPool;
cognitoIdentityServiceProvider.CognitoUser = CognitoUser;

module.exports = cognitoIdentityServiceProvider;
