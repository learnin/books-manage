import * as actionTypes from '../utils/actionTypes';

const books = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        books: action.books
      };
    case actionTypes.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.error.message
      };
    default:
      return state;
  }
};

export default books;
