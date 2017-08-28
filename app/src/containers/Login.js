import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions';

const handleSubmit = (e, dispatch) => {
  e.preventDefault();
  dispatch(actions.fetchLoginIfNeeded(e.target.username.value.trim(), e.target.password.value.trim()));
};

const LoginContainer = ({ dispatch }) => {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, dispatch)}>
        <input type="text" name="username" /><br/>
        <input type="password" name="password" /><br/>
        <input type="submit" value="ログイン" />
        <Link to='/hello'>hello</Link>
      </form>
    </div>
  );
}

export default connect()(LoginContainer);