import React from 'react';
import './ExpandBtn.scss';

const ExpandBtn = () => {
  const handleToddleWidth = (event) => {
    event.target.parentNode.classList.toggle('full-container');
    event.target.classList.toggle('shrink-background');
  };

  return <button onClick={handleToddleWidth} aria-label="expand" type="button" className="expand-btn" />;
};

export default ExpandBtn;
