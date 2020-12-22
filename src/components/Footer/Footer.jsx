import React from 'react';
import logo from '../../assets/icons/rs_school_js.svg';

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
          <img alt="logo" className="logo" src={logo} />
        <span>
          by <a href="https://github.com/LiliyaSm">LiliyaSm</a>
        </span>{' '}
        <a href="https://rs.school/js/">
          {' '}
        </a>
        2020
      </div>
    </footer>
  );
}

export default Footer;
