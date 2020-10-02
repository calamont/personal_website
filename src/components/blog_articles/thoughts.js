import React, { useState } from "react";
import SideBar from "./sidebar";
import ReactMarkdown from 'react-markdown';
import { CSSTransition } from 'react-transition-group';

import Scroll from '../Scroll';
import BlogHeaderImage from './BlogHeaderImage';

const Thoughts = () => {

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
  return (
    <div>
      <div>
        {/* <TransitionGroup component={null}> */}
        <CSSTransition
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
            {/* <div className="blog-title">
              <h2 style={{ margin: '0px' }}>
                <button className="openbtn" onClick={toggleSidebar}>☰ </button>
                <span className="blog-title-text">{blogHeading}</span>
              </h2>
            </div> */}
            {/* <Scroll> */}
            {/* <BlogHeaderImage src={blogImage} /> */}
            {/* <ReactMarkdown source={blogText} className="blog-text" /> */}
            <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
            {/* </Scroll> */}
          </div>
        </CSSTransition>
        {/* </TransitionGroup> */}
      </div>
    </div>
  );
}

export default Thoughts;
