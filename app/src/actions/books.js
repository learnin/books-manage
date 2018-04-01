import { push } from 'react-router-redux';

import * as actionTypes from '../utils/actionTypes';

const API_URL = document.getElementById('REACT_APP_API_URL') &&  document.getElementById('REACT_APP_API_URL').value;

function fetchBooksRequest() {
  return {
    type: actionTypes.FETCH_BOOKS_REQUEST
  };
}

function fetchBooksSuccess(books) {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books
  };
}

function fetchBooksFailure(error) {
  return {
    type: actionTypes.FETCH_BOOKS_FAILURE,
    error
  };
}

// FIXME 仮実装
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
    }).then(response => response.json())
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
    dispatch(fetchBooksRequest());

    fetch(API_URL + 'books', {
      headers: {
        'Authorization': state.authenticator.accessToken
      }
    })
    .then(response => response.json())
    .then(books => {
      console.log(books);
      dispatch(fetchBooksSuccess(books));
      dispatch(push('/books'));
    })
    .catch(err => {
      console.error(err);
      dispatch(fetchBooksFailure(err));
    });
  };
}

export function listBooks() {
  return (dispatch, getState) => {
    return dispatch(fetchBooks(getState()));
  };
}

function fetchMyBooks(state) {
  return dispatch => {
    fetch(API_URL + 'my/books', {
      headers: {
        'Authorization': state.authenticator.accessToken
      }
    }).then(response => response.json())
    .then(console.log)
    .catch(console.error);
  };
}

export function listMyBooks() {
  return (dispatch, getState) => {
    return dispatch(fetchMyBooks(getState()));
  };
}
