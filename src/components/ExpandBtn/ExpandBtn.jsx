import React from 'react';
import './ExpandBtn.scss';
import PropTypes from 'prop-types';

const ExpandBtn = ({ setIsFullScreenSize, isFullScreenSize }) => {
  const handleToddleWidth = () => {
    setIsFullScreenSize(!isFullScreenSize);
  };

  return (
    <button
      onClick={handleToddleWidth}
      aria-label="expand"
      type="button"
      className={isFullScreenSize ? 'expand-btn shrink-background' : 'expand-btn'}
    />
  );
};

ExpandBtn.propTypes = {
  setIsFullScreenSize: PropTypes.func.isRequired,
  isFullScreenSize: PropTypes.bool.isRequired,
};

export default ExpandBtn;
