import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

const Loader = ({ color, size, className }) => (
  <Spinner animation="border" role="status" variant={color} size={size} className={className} />
);

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  color: '',
  size: '',
  className: '',
};

export default Loader;
