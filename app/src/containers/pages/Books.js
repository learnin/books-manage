import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as booksActions from '../../redux/modules/books';
import Button from '../../components/atoms/Button';
import BookCardList from '../organisms/BookCardList';

const BooksContainer = ({ actions, books }) => (
  <div>
    <BookCardList books={books} />
    <Button onClick={actions.createBook}>createBook</Button>
  </div>
);

BooksContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  books: state.books.books
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(booksActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksContainer);
