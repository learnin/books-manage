import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authenticateActions from '../redux/modules/authenticate';

class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const { actions, message } = this.props;

    return (
      <div>
        {message}<br/>
        <input type="text" ref="username" name="username" /><br/>
        <input type="password" ref="password" name="password" /><br/>
        <button onClick={() => actions.fetchLoginIfNeeded(
          ReactDOM.findDOMNode(this.refs.username).value.trim(),
          ReactDOM.findDOMNode(this.refs.password).value.trim()
        )}>ログイン</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogined: state.authenticate.isLogined,
  message: state.authenticate.message
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authenticateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
