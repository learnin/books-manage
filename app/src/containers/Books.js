import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as booksActions from '../redux/modules/books';
import Button from '../components/atoms/Button';

const BooksContainer = ({ actions, books }) => (
  <div>
    {
      books.map((book) => {
        return (
          <div key={book.BookId}>{book.Name}</div>
        );
      })
    }
    <Button onClick={actions.createBook}>createBook</Button>
  </div>
);

BooksContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      BookId: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired
    })).isRequired
};

const mapStateToProps = state => ({
  books: state.books.books
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(booksActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);
