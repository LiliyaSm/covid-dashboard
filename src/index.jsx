import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotifyProvider from './Providers/NotifyProvider';
import CommonProvider from './Providers/CommonProvider';

ReactDOM.render(
  <React.StrictMode>
    <NotifyProvider>
      <CommonProvider>
        <App />
      </CommonProvider>
    </NotifyProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
