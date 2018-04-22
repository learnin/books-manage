import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ inputRef }) => (
  <input type="text" ref={inputRef} />
);

TextField.propTypes = {
  inputRef: PropTypes.func
};

export default TextField;
