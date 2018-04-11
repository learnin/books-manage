import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as booksActions from '../redux/modules/books'

const handleListBooks = (e, dispatch) => {
  e.preventDefault();
  dispatch(booksActions.listBooks());
};

const handleListMyBooks = (e, dispatch) => {
  e.preventDefault();
  dispatch(booksActions.listMyBooks());
};

const HelloContainer = ({ dispatch }) => {
  return (
    <div>
      <input type="button" value="listBooks" onClick={(e) => handleListBooks(e, dispatch)} />
      <input type="button" value="listMyBooks" onClick={(e) => handleListMyBooks(e, dispatch)} />
    </div>
  );
};

export default connect()(HelloContainer);
