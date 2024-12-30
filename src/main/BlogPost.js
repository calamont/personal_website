import React, { useState } from 'react';

import './Blog.css';

const BlogPost = ({ file }) => {
  const [blogText, setBlogText] = useState('');

  fetch(process.env.PUBLIC_URL + `/${file}`)
    .then((response) => response.text())
    .then((text) => setBlogText(text))
    .catch((err) => console.log('ERROR', err));

  return <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />;
};

export default BlogPost;
