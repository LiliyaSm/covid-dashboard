import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const NotifyContext = React.createContext({
  notify: null,
  addNotify: () => {},
  removeNotify: () => {},
});

export default function NotifyProvider({ children }) {
  const [notify, setNotify] = useState(null);

  const removeNotify = () => setNotify(null);

  const addNotify = (type, headerText, contentText) => {
    setNotify({ type, headerText, contentText });
    setTimeout(removeNotify, 3000);
  };

  const contextValue = {
    notify,
    addNotify: useCallback((type, headerText, contentText) => addNotify(type, headerText, contentText), []),
    removeNotify: useCallback(() => removeNotify(), []),
  };

  return <NotifyContext.Provider value={contextValue}>{children}</NotifyContext.Provider>;
}

NotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
