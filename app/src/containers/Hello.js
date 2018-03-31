import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const handleHello = (e, dispatch) => {
  e.preventDefault();
  dispatch(actions.hello());
};

const handleCreateBook = (e, dispatch) => {
  e.preventDefault();
  dispatch(actions.createBook());
};

const handleListBooks = (e, dispatch) => {
  e.preventDefault();
  dispatch(actions.listBooks());
};

const HelloContainer = ({ dispatch }) => {
  return (
    <div>
      <input type="button" value="hello" onClick={(e) => handleHello(e, dispatch)} />
      <input type="button" value="createBook" onClick={(e) => handleCreateBook(e, dispatch)} />
      <input type="button" value="listBooks" onClick={(e) => handleListBooks(e, dispatch)} />
    </div>
  );
};

export default connect()(HelloContainer);
