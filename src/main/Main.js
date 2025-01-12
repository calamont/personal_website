import React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './About';
import blogDetails from './BlogDetails.json';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import './Main.css';

const Main = () => {
  return (
    <div className="main">
      <div className="main-content">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          {blogDetails.files.map((blog) => (
            <Route path={'/blog/' + blog.slug} key={blog.slug}>
              <BlogPost blogDetails={blog} />
            </Route>
          ))}
          <Route path="/blog" component={BlogList} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
