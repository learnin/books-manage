import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authenticateActions from '../redux/modules/authenticate';

import TextField from '../components/TextField';

class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const { actions, message } = this.props;

    return (
      <div>
        {message}<br/>
        <TextField id="username" name="username" />
        <input type="password" ref="password" name="password" /><br/>
        <button onClick={() => actions.fetchLoginIfNeeded(
          document.getElementById('username').value.trim(),
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
