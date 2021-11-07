import React from 'react'
import { Route, Switch } from "react-router-dom";
import About from './About';
import { MainContent, LondonNLP, Tester, BlogPost } from './MainContent';
import './Main.css';

// TODO: The sketches README file cannot be found
const Main = () => {
  return (
    <div className="main">
      <div className="main-content">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/:topic/:file">
            <BlogPost />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Main;
