import { push } from 'react-router-redux';

import * as actionTypes from '../utils/actionTypes';

import * as apiClient from '../apiClient';

// const API_URL = document.getElementById('REACT_APP_API_URL') &&  document.getElementById('REACT_APP_API_URL').value;

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

export function createBook() {
  return (dispatch, getState) => {
    apiClient.createBook(getState().authenticator.accessToken)
      .then(res => {
        const { payload, error } = res;
        if (payload && !error) {
          console.log(payload);
        } else {
          console.error(error);
        }
      });
  };
}

export function listBooks() {
  return (dispatch, getState) => {
    dispatch(fetchBooksRequest());

    apiClient.fetchBooks(getState().authenticator.accessToken)
      .then(res => {
        const { payload, error } = res;
        if (payload && !error) {
          console.log(payload);
          dispatch(fetchBooksSuccess(payload));
          dispatch(push('/books'));
        } else {
          console.error(error);
          dispatch(fetchBooksFailure(error));
        }
      });
  };
}

export function listMyBooks() {
  return (dispatch, getState) => {
    apiClient.fetchMyBooks(getState().authenticator.accessToken)
    .then(res => {
      const { payload, error } = res;
      if (payload && !error) {
        console.log(payload);
      } else {
        console.error(error);
      }
    });
  };
}
