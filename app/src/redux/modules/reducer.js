import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authenticate from './authenticate';
import books from './books';

export default combineReducers({
  authenticate,
  books,
  routing: routerReducer
});
