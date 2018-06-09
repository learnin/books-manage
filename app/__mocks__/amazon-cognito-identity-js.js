'use strict';

const cognitoIdentityServiceProvider = jest.genMockFromModule(
  'amazon-cognito-identity-js'
);

class AuthenticationDetails {
  constructor(authenticationData) {
    this.username = authenticationData.Username;
    this.password = authenticationData.Password;
  }
}

class CognitoUserPool {
  constructor(poolData) {}
}

const __test__correctUserAccount = {
  username: 'correct_username',
  password: 'correct_password',
  accessToken: 'correct_accessToken'
};
const __test__errorOnAuthenticate = {
  message: 'username or password is wrong.'
};

class CognitoUser {
  constructor(userData) {
    return {
      authenticateUser: function(authenticationDetails, callback) {
        if (CognitoUser.authenticate(authenticationDetails)) {
          return callback.onSuccess({
            getIdToken: function() {
              return {
                getJwtToken: function() {
                  return __test__correctUserAccount.accessToken;
                }
              };
            }
          });
        }
        return callback.onFailure(__test__errorOnAuthenticate);
      }
    };
  }
  static authenticate(authenticationDetails) {
    return (
      authenticationDetails &&
      authenticationDetails.username === __test__correctUserAccount.username &&
      authenticationDetails.password === __test__correctUserAccount.password
    );
  }
}

cognitoIdentityServiceProvider.AuthenticationDetails = AuthenticationDetails;
cognitoIdentityServiceProvider.CognitoUserPool = CognitoUserPool;
cognitoIdentityServiceProvider.CognitoUser = CognitoUser;
cognitoIdentityServiceProvider.__test__correctUserAccount = __test__correctUserAccount;
cognitoIdentityServiceProvider.__test__errorOnAuthenticate = __test__errorOnAuthenticate;

module.exports = cognitoIdentityServiceProvider;
