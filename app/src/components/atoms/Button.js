import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, children }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
