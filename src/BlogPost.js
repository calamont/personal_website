import React from 'react';

const BlogPost = ({ blogText }) => {
  const renderMath = () => {
    if ("MathJax" in window) {
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
