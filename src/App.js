import React, { Component, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './components/about';
import Blog from './components/blog';
import Thoughts from './components/blog_articles/thoughts'
import Sketches from './components/sketches';
import SideBar from "./components/blog_articles/sidebar";
import Scroll from './components/Scroll';

import './App.css';

const App = () => {
  const [sidebarState, setSidebarState] = useState(false)
  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    console.log("pressed", sidebarState)
  }

  const [blogText, setBlogText] = useState("");
  const [blogHeading, setBlogHeading] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const changeBlog = (fileObj) => {
    setBlogHeading(fileObj.title)
    setBlogImage(fileObj.image)
    fetch(process.env.PUBLIC_URL + `/blog_articles/${fileObj.file}`)
      .then(response => response.text())
      .then(text => setBlogText(text))
      .catch(err => console.log("ERROR", err))
  }
  // let text = "# This is a test\nA test a test"
  console.log("blog", blogHeading)

  // render() {
  return (
    <div>
      {/* <Router>
        <div className="navbar">
          <a class="navbar-brand" href="#">Callum Lamont</a>
          <div className="navbar-items"> */}
      {/* <ul id="nav">
              <Link to="/github" class="nav-item nav-link">
                <i class="button fab fa-github fa-lg"></i>
              </Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/sketches">Sketches</Link>
            </ul> */}
      {/* </div> */}
      <Thoughts />
      {/* // <Switch> */}
      {/* <Route path='/github' component={() => { */}
      {/* //     window.location.href = "https://github.com/calamont";
          //     return null;
          //   }} />
          //   <Route path='/about' component={About} />
          //   <Route path='/blog' component={Blog} />
          //   <Route path='/thoughts' component={Thoughts} />
          //   <Route path='/sketches' component={Sketches} />
          // </Switch>
        // </div > */}
      {/* // </Router > */}
      {/* <CSSTransition
        in={sidebarState}
        classNames="sidebar-toggle"
        appear>
        <SideBar topic="thoughts" changeBlog={changeBlog} />
      </CSSTransition>
      <CSSTransition
        in={sidebarState}
        classNames="article-toggle"
        appear>
        <div className="article-toggle">
          <div className="blog-title">
            <h2 style={{ margin: '0px' }}>
              <button className="openbtn" onClick={toggleSidebar}>☰ </button>
              <span className="blog-title-text">{blogHeading}</span>
            </h2>
          </div>
          <Scroll>
            {/* <BlogHeaderImage src={blogImage} /> */}
      {/* <ReactMarkdown source={blogText} className="blog-text" /> */}
      {/* <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
          </Scroll>
        </div>
      </CSSTransition> */}
    </div >
  );
}

export default App;
