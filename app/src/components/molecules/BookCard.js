import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, onClick }) => (
  <div onClick={onClick}>{book.Name}</div>
);

BookCard.propTypes = {
  book: PropTypes.shape({
    Name: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

export default BookCard;
