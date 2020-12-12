import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import './Alerts.scss';
import { NotifyContext } from '../../Providers/NotifyProvider';

const Alerts = () => {
  const { notify, removeNotify } = useContext(NotifyContext);

  return (
    <div className="alert-message">
      <Alert variant={notify.type} onClose={removeNotify} dismissible>
        <Alert.Heading>{notify.headerText}</Alert.Heading>
        <p>{notify.contentText}</p>
      </Alert>
    </div>
  );
};

export default Alerts;
