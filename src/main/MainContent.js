import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import * as sketches from './sketches/sketches';

import './Notebook.css';
import './Blog.css';


export const MainContent = ({ content }) => {

  if (content.type === "text") {
    return <BlogPost content={content} />
  } else if (content.type === "sketch") {
    return (
      <P5Wrapper sketches={sketches} title={content.title} />
    )
  }
}

export const BlogPost = () => {

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

// export default MainContent;
