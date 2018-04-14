import { push } from 'react-router-redux';
import * as apiClient from '../../apiClient';

export const LOAD_REQUEST = 'books-manage/books/LOAD_REQUEST';
export const LOAD_SUCCESS = 'books-manage/books/LOAD_SUCCESS';
export const LOAD_FAILURE = 'books-manage/books/LOAD_FAILURE';

const initialState = {
  isFetching: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        books: action.payload.books
      };
    case LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
}

function fetchBooksRequest() {
  return {
    type: LOAD_REQUEST
  };
}

function fetchBooksSuccess(books) {
  return {
    type: LOAD_SUCCESS,
    payload: {
      books
    }
  };
}

function fetchBooksFailure(message) {
  return {
    type: LOAD_FAILURE,
    payload: {
      message
    },
    error: true
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
          dispatch(fetchBooksFailure(error.message));
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
