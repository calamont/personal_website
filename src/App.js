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

  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    console.log("pressed", sidebarState)
  }

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
          <span className="navbar-toggle" onClick={toggleSidebar}>x</span>
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
