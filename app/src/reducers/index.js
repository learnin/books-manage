import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import authenticator from './authenticator';

const reducer = combineReducers({
  authenticator,
  routing: routerReducer
});

export default reducer;
