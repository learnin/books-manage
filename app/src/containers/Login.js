import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';

class LoginContainer extends React.Component {
  render() {
    const { actions } = this.props;

    return (
      <div>
        <input type="text" ref="username" id="username" /><br/>
        <input type="password" ref="password" id="password" /><br/>
        <button onClick={() => actions.fetchLoginIfNeeded(ReactDOM.findDOMNode(this.refs.username).value.trim(), ReactDOM.findDOMNode(this.refs.password).value.trim())}>ログイン</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    isLogined: state.authenticator.isLogined
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
