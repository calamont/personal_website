import React from 'react';
import { Link } from 'react-router-dom';

import './Blog.css';
import blogDetails from './BlogDetails.json';

const BlogList = () => {
  return (
    <div className="blog-list">
      <div className="blog-list-links">
        <p>
          {`Below are my blogs. Topics include software, technology, science, and armchair philosophy.
            Some of these pieces make me cringe now. Particularly those written over five years ago. But
            I keep them here to remind me how we change (and improve) over time.`}
        </p>
        {blogDetails.files.map((blog) => (
          <div className="blog-link" key={blog.slug}>
            <div className="blog-date">{blog.date}</div>
            <Link to={'/blog/' + blog.slug}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
