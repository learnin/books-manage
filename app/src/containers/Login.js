import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';

class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const { actions } = this.props;

    return (
      <div>
        <input type="text" ref="username" id="username" /><br/>
        <input type="password" ref="password" id="password" /><br/>
        <button onClick={() => actions.fetchLoginIfNeeded(
          ReactDOM.findDOMNode(this.refs.username).value.trim(),
          ReactDOM.findDOMNode(this.refs.password).value.trim()
        )}>ログイン</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

const mapStateToProps = state => ({
  isLogined: state.authenticator.isLogined
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
