import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authenticateActions from '../../redux/modules/authenticate';

import TextField from '../../components/atoms/TextField';
import Button from '../../components/atoms/Button';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.usernameEl = null;
    this.passwordEl = null;
    this.login = loginFn => {
      loginFn(this.usernameEl.value, this.passwordEl.value);
    };
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const { actions, message } = this.props;

    return (
      <div>
        <div>{message}</div>
        <div>
          <TextField name="username" inputRef={el => (this.usernameEl = el)} />
        </div>
        <div>
          <input
            type="password"
            name="password"
            ref={el => (this.passwordEl = el)}
          />
        </div>
        <div>
          <Button onClick={e => this.login(actions.fetchLoginIfNeeded)}>
            ログイン
          </Button>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
