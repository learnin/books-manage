import React from 'react';
import PropTypes from 'prop-types';

import BookCard from '../../components/molecules/BookCard';

const BookCardList = ({ books }) => (
  <div>{books.map(book => <BookCard key={book.BookId} book={book} />)}</div>
);

BookCardList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      BookId: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BookCardList;
