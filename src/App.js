import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import SidebarItems from './SidebarItems';
import BlogPost from './BlogPost';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import './App.css';

const App = () => {

  const [blogText, setBlogText] = useState("");
  const [sidebarState, setSidebarState] = useState(true)

  // Shows/hides the dropdown sidebar
  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    console.log("pressed", sidebarState)
  }

  // Rerender page to include LaTex style maths
  const renderMath = () => {
    if ("MathJax" in window) {
      console.log("finding mathhhhs")
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
        <div class="callum-header" href="#">
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
          <SidebarItems setSidebarState={setSidebarState} setBlogText={setBlogText} />
        </CSSTransition>
      </div >
      <Route path="/:filepath" render={() => (
        <BlogPost blogText={blogText} />
      )} />
    </Router>
  );
}

export default App;
