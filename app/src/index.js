import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import './index.css';
import Login from './containers/Login';
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
