import { push } from 'react-router-redux';
import * as apiClient from '../../apiClient';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

const initialState = {
  isFetching: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        books: action.books
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.error.message
      };
    default:
      return state;
  }
}

function fetchBooksRequest() {
  return {
    type: FETCH_BOOKS_REQUEST
  };
}

function fetchBooksSuccess(books) {
  return {
    type: FETCH_BOOKS_SUCCESS,
    books
  };
}

function fetchBooksFailure(error) {
  return {
    type: FETCH_BOOKS_FAILURE,
    error
  };
}

export function createBook() {
  return (dispatch, getState) => {
    apiClient.createBook(getState().authenticate.accessToken)
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

    apiClient.fetchBooks(getState().authenticate.accessToken)
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
    apiClient.fetchMyBooks(getState().authenticate.accessToken)
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
