import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    const { id, name } = this.props;

    return (
      <div>
        <input type="text" id={id} name={name} />
      </div>
    );
  }
}

export default TextField;
