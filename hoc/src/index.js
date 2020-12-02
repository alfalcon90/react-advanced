import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from 'components/App';
import Root from 'Root';

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Root>
  </React.StrictMode>,
  document.getElementById('root'),
);
