const API_URL = document.getElementById('REACT_APP_API_URL') &&  document.getElementById('REACT_APP_API_URL').value;

const cognitoIdentityServiceProvider = require('amazon-cognito-identity-js');

export function authenticateUser(username, password, callback) {
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
  cognitoUser.authenticateUser(authenticationDetails, callback);
};

// FIXME 仮実装
export function createBook(accessToken) {
  return fetch(API_URL + 'books', {
    method: 'POST',
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isbn: '9784274217883',
      name: 'テスト駆動開発',
      author: 'Kent Beck 著／和田 卓人　訳'
    })
  })
  // FIXME res.okを見る
  .then(res => res.json())
  .then(payload => ({payload}))
  .catch(error => ({error}));
}

export function fetchBooks(accessToken) {
  return fetch(API_URL + 'books', {
    headers: {
      'Authorization': accessToken
    }
  })
  // FIXME res.okを見る
  .then(res => res.json())
  .then(payload => ({payload}))
  .catch(error => ({error}));
}

export function fetchMyBooks(accessToken) {
  return fetch(API_URL + 'my/books', {
    headers: {
      'Authorization': accessToken
    }
  })
  // FIXME res.okを見る
  .then(res => res.json())
  .then(payload => ({payload}))
  .catch(error => ({error}));
}
