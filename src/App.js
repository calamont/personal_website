import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import SidebarItems from './SidebarItems';
// import BlogPost from './BlogPost';
import About from './About';
import MainContent from './MainContent';

import P5Wrapper from 'react-p5-wrapper';
// import sketch from './sketches/spinner/sketch';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import './App.css';

const App = () => {

  const [content, setContent] = useState({});
  const [sidebarState, setSidebarState] = useState(true)

  // Shows/hides the dropdown sidebar
  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
  }

  // Rerender page to include LaTex style maths
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
      <div className="sidebar">
        <div className="callum-header" href="#">
          <span>Callum Lamont</span>
          <span className="navbar-toggle" onClick={toggleSidebar}>
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="50" height="4" rx="2" ry="2"></rect>
              <rect width="50" height="4" rx="2" ry="2" y="15"></rect>
              <rect width="50" height="4" rx="2" ry="2" y="30"></rect>
            </svg>
          </span>
        </div>
        <CSSTransition in={sidebarState}
          classNames="sidebar-toggle"
          timeout={{ appear: 0, enter: 0, exit: 3000 }}
          appear
          unmountOnExit>
          <SidebarItems setSidebarState={setSidebarState} setContent={setContent} />
        </CSSTransition>
      </div >
      <div className="main-content">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:filepath" render={() => (
            <MainContent content={content} />
          )} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
