import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as booksActions from '../redux/modules/books'

const HelloContainer = ({ actions }) => (
  <div>
    <input type="button" value="listBooks" onClick={actions.listBooks} />
    <input type="button" value="listMyBooks" onClick={actions.listMyBooks} />
  </div>
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(booksActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HelloContainer);
