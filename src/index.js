import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
export const globalVariables = {
  addMembersModalEffect: false,
  settingsModalEffect: false,
};

export const getGlobalVariable = (key) => globalVariables[key];

export const setGlobalVariable = (key, value) => {
  globalVariables[key] = value;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
