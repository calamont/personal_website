import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import About from './about';
import Sketches from './sketches';

class Navbar extends Component {
  render() {
    return (
      <router>
        <div className="navbar">
          <a class="navbar-brand" href="#">Callum Lamont</a>
          <div className="navbar-items">
            <ul id="nav">
              <Link to="https://github.com/calamont" class="nav-item nav-link">
                <i class="button fab fa-github fa-lg"></i>
              </Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/sketches">Sketches</Link>
            </ul>
          </div>
          <Switch>
            <Route path='/about' component={About} />
            <Route path='/blog' component={Blog} />
            <Route path='/sketches' component={Sketches} />
          </Switch>
        </div>
      </router>
    );
  }
}

export default Navbar;
