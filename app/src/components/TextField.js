import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ inputRef }) => (
  <div>
    <input type="text" ref={inputRef} />
  </div>
);

TextField.propTypes = {
  inputRef: PropTypes.func
};

export default TextField;
