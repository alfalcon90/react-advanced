import React from 'react';
import Header from './components/Header';

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default App;
