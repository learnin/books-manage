import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import './index.css';
import Login from './containers/pages/Login';
import Hello from './containers/pages/Hello';
import Books from './containers/pages/Books';
import reducer from './redux/modules/reducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducer,
  applyMiddleware(thunk, routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="/hello" component={Hello} />
      <Route path="books" component={Books} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
