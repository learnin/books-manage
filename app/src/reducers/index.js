import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authenticator from './authenticator';
import books from './books';

const reducer = combineReducers({
  authenticator,
  books,
  routing: routerReducer
});

export default reducer;
