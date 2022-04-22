import React from 'react';
import Header from './header/Header.js';
import Sidebar from './sidebar/Sidebar.js';
import Main from './main/Main.js';
import "./App.css";

import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';

// TODO: On the blank index page there is a _tiny_ amount of scroll. This might
// be a bit too tricky for me to work out right now.
const App = () => {

  // Rerender page to include LaTex style maths
  // TODO: Is this necessary and if so, can it be handled anywhere else?
  const renderMath = () => {
    if ("MathJax" in window) {
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
      ])
    }
  }
  renderMath()

  return (
    <Router>
      <div>
        <input type="checkbox" className="header-accordion" id={"header-accordion"} tabIndex={0}/>
        <div className="App">
          <Header/>
          <Sidebar/>
          <Main/>
        </div>
      </div>
    </Router >
  );
}

export default App;
