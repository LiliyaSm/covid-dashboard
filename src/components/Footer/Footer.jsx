import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icons/rs_school_js.svg';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-wrapper">
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img alt="logo" className="logo" src={logo} />
        </a>
        <div>
          <span>
            {t('footer.by')}
            &nbsp;
            <a href="https://github.com/LiliyaSm" target="_blank" rel="noreferrer">
              LiliyaSm
            </a>
            &nbsp;
          </span>
          <span>
            {t('footer.and')}
            &nbsp;
            <a href="https://github.com/gentaliana" target="_blank" rel="noreferrer">
              Gentaliana
            </a>
          </span>
        </div>
        2020
      </div>
    </footer>
  );
}

export default Footer;
