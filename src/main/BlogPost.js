import React, { useState } from 'react';

import './Blog.css';

const BlogPost = ({ blogDetails }) => {
  const [blogText, setBlogText] = useState('');

  fetch(process.env.PUBLIC_URL + `/${blogDetails.file}`)
    .then((response) => response.text())
    .then((text) => setBlogText(text))
    .catch((err) => console.log('ERROR', err));

  return (
    <div>
      <meta name="title" content={blogDetails.title} />
      <meta name="og:title" content={blogDetails.title} />
      <meta name="description" content={blogDetails.description} />
      <meta name="og:description" content={blogDetails.description} />
      <meta name="keywords" content={blogDetails.keywords} />
      <meta name="og:keywords" content={blogDetails.keywords} />
      <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
    </div>
  );
};

export default BlogPost;
