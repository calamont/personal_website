import React, { useState } from 'react';

import './Blog.css';

const BlogPost = ({ blogDetails }) => {
  const [blogText, setBlogText] = useState('');

  fetch(process.env.PUBLIC_URL + `/${blogDetails.file}`)
    .then((response) => response.text())
    .then((text) => setBlogText(text))
    .catch((err) => console.log('ERROR', err));

  const domain = 'callumlamont.com';
  const previewImgUrl = `https://${domain}/blog/images/preview/${blogDetails.slug}.png`;
  const pageUrl = `https://${domain}/blog/${blogDetails.slug}`;

  return (
    <div>
      <meta name="title" property="og:title" content={blogDetails.title} />
      <meta name="description" property="og:description" content={blogDetails.description} />
      <meta name="keywords" property="og:keywords" content={blogDetails.keywords} />
      <meta name="image" property="og:image" content={previewImgUrl} />
      <meta name="type" property="og:type" content="article" />
      <meta name="url" property="og:url" content={pageUrl} />
      <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
    </div>
  );
};

export default BlogPost;
