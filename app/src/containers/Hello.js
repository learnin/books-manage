import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const handleHello = (e, dispatch) => {
  e.preventDefault();
  dispatch(actions.hello());
};

const HelloContainer = ({ dispatch }) => {
  return (
    <div>
      <input type="button" value="hello" onClick={(e) => handleHello(e, dispatch)} />
    </div>
  );
}

export default connect()(HelloContainer);
