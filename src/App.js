import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import './App.css';
import Header from './header/Header.js';
import Main from './main/Main.js';

const App = () => {
  return (
    <Router>
      <div>
        <div className="App">
          <Header />
          <Main />
        </div>
      </div>
    </Router>
  );
};

export default App;
