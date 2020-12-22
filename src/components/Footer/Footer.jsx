import React from 'react';
import logo from '../../assets/icons/rs_school_js.svg';

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div>
          <span>
            by <a href="https://github.com/LiliyaSm">LiliyaSm</a>
          </span>{' '}
          <span>
            and <a href="https://github.com/gentaliana">Gentaliana</a>
          </span>
          <a href="https://rs.school/js/"> </a>
        </div>
        <span>
          {' '}
          <img alt="logo" className="logo" src={logo} />
          2020
        </span>
      </div>
    </footer>
  );
}

export default Footer;
