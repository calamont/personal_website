import React, { Component } from 'react';
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

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="navbar">
          <a class="navbar-brand" href="#">Callum Lamont</a>
          <div className="navbar-items">
            <ul id="nav">
              <Link to="/github" class="nav-item nav-link">
                <i class="button fab fa-github fa-lg"></i>
              </Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/sketches">Sketches</Link>
            </ul>
          </div>
          <Switch>
            <Route path='/github' component={() => {
              window.location.href = "https://github.com/calamont";
              return null;
            }} />
            <Route path='/about' component={About} />
            <Route path='/blog' component={Blog} />
            <Route path='/thoughts' component={Thoughts} />
            <Route path='/sketches' component={Sketches} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
