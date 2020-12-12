import React from 'react';
// import expandBtn from '../assets/icons/expandBtn.svg';

const ToggleBtn = () => {
  // state = {
  //         active: false,
  //     };

  const handleToddleWidth = (event) => {
    console.log(event.target);
    event.target.parentNode.classList.toggle('full-container');
  };

  return (
    <button onClick={handleToddleWidth} type="button" className="toggle-btn">
      {/* <img src={expandBtn} alt="expand" /> */}
    </button>
  );
};

export default ToggleBtn;
