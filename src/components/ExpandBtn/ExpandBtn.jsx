import React, { useContext } from 'react';
import './ExpandBtn.scss';
import PropTypes from 'prop-types';
import { CommonContext } from '../../Providers/CommonProvider';

const ExpandBtn = ({ setIsFullScreenSize, isFullScreenSize }) => {
  const { isFullScreenOptions, changeIsFullScreenOptions } = useContext(CommonContext);
  const handleToddleWidth = () => {
    setIsFullScreenSize(!isFullScreenSize);
    changeIsFullScreenOptions(!isFullScreenOptions);
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
