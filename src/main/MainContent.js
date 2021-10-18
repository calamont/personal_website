import React, { useState } from 'react';
import { unmountComponentAtNode, render } from "react-dom";

import * as sketches from './sketches/sketches';

import './Notebook.css';
import './Blog.css';

const MainContent = ({ content }) => {

  if (content.type === "text") {
    return <BlogPost content={content} />
  } else if (content.type === "sketch") {
    return (
      <P5Wrapper sketches={sketches} title={content.title} />
    )
  }
}

const BlogPost = ({ content }) => {

  const [blogText, setBlogText] = useState("");

  fetch(process.env.PUBLIC_URL + `/${content.file}`)
    .then(response => response.text())
    .then(text => setBlogText(text))
    .catch(err => console.log("ERROR", err))

  return (
    <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
  )
}

class P5Wrapper extends React.Component {
  constructor({ sketches }) {
    super();
    this.myRef = React.createRef();
    this.sketches = sketches;
  }

  componentDidMount() {
    this.myP5 = new window.p5(this.sketches[this.props.title], this.myRef.current)
  }

  componentDidUpdate() {
    this.myP5.remove()
    this.myP5 = new window.p5(this.sketches[this.props.title], this.myRef.current)
  }

  componentWillUnmount() {
    this.myP5.remove()
  }
  render() {
    return (
      <div
        className="p5-wrapper-canvas"
        ref={this.myRef}
      />
    )
  }
}

export default MainContent;
