import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/books';

class BooksContainer extends React.Component {
  render() {
    const { books } = this.props;

    return (
      <div>
        {
          books.map((book) => {
            return (
              <div key={book.BookId}>{book.Name}</div>
            );
          })
        }
        <input type="button" value="createBook" onClick={() => actions.createBook()} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
  books: state.books.books
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer);