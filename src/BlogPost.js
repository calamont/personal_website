import React from 'react';

const BlogPost = ({ blogText }) => {
  const renderMath = () => {
    console.log("Not in windowwwww")
    console.log("MathJax" in window)
    console.log(Object.getOwnPropertyNames(window).sort())
    console.log(window)
    if ("MathJax" in window) {
      console.log("finding mathhhhs")
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
      ])
    }
  }
  return (
    <div className="main-content">
      <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
    </div>
  )
}

export default BlogPost;
