import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import About from './About';

import './Main.css';
import './Notebook.css';
import './Blog.css';

import * as sketches from './sketches/sketches';

const Main = () => {
  return (
    <div className="main">
      <div className="main-content">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/sketches/readme" component={SketchesReadme} />
          <Route path="/sketches/:file" component={P5Func} />
          <Route path="/:topic/:file" component={BlogPost} />
        </Switch>
      </div>
    </div>
  )
}

const BlogPost = () => {

  const params = useParams();
  const [blogText, setBlogText] = useState("");

  // TODO: Storing the relevant HTML files in public/ seems quite ghetto. Should
  // I fetch files from a server?
  fetch(process.env.PUBLIC_URL + `/${params.topic}/${params.file}.html`)
    .then(response => response.text())
    .then(text => setBlogText(text))
    .catch(err => console.log("ERROR", err))

  return (
    <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
  )
}

const SketchesReadme = () => {

  const params = useParams();
  const [blogText, setBlogText] = useState("");

  // TODO: Storing the relevant HTML files in public/ seems quite ghetto. Should
  // I fetch files from a server?
  fetch(process.env.PUBLIC_URL + `/sketches/readme.html`)
    .then(response => response.text())
    .then(text => setBlogText(text))
    .catch(err => console.log("ERROR", err))

  return (
    <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
  )
}

const P5Func = () => {
  const params = useParams();

  // TODO: It feels like this should be in the useEffect hook? But when it is it complains
  // that myRef used in the return div is undefined.
  if (typeof myRef === "undefined") {
    var myRef = React.createRef();
  }

  useEffect(() => {
    var myP5 = new window.p5(sketches[params.file], myRef.current)
    // TODO: When navigating away from a sketch there is a "FirefoxCP isolated web
    // content" that keeps using a small amount of resources. I tried the code
    // below to make it go away when unmounting but with no luck.
    return () => {
      myP5.remove();
      myP5 = null;
      myRef = null;
    }
  }, [params.file])

  return (
    <div
      className="p5-wrapper-canvas"
      ref={myRef}
    />
  )
}

export default Main;
