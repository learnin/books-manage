import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as booksActions from '../../redux/modules/books';
import Button from '../../components/atoms/Button';

const HelloContainer = ({ actions }) => (
  <div>
    <Button onClick={actions.listBooks}>listBooks</Button>
    <Button onClick={actions.listMyBooks}>listMyBooks</Button>
  </div>
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(booksActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloContainer);
