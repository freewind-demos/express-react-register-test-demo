import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './register-form.jsx';

ReactDOM.render(
  <RegisterForm />,
  document.getElementById("content")
);

// Notice!!!
// Following is required to make reloading happen
if (module.hot) {
  module.hot.accept();
}
