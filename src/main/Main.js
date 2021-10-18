import React from 'react'
import { Route, Switch } from "react-router-dom";
import About from './About';
import MainContent from './MainContent';
import './Main.css';

const Main = ({ content }) => {
  return (
    <div className="main">
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
    </div>
  )
}

export default Main;
