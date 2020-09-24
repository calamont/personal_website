import React from "react";
import {
  useRouteMatch,
  Link,
} from "react-router-dom";

const BlogTopic = ({ title, text, path }) => {
  return (
    <div>
      <Link to={`${path}`}>
        <div className="blog_topic" id="test">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </Link>
    </div>
  );
}

export default BlogTopic;
