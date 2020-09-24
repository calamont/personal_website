import React, { Component } from "react";
import summary from "./blog_articles/summary.json";

import BlogTopic from "./blog_topic";

const Topics = () => {
  return (
    <div className="topics">
      {
        summary["blog_summaries"].map((blogPost, i) => {
          return (
            <BlogTopic
              key={i}
              title={blogPost.title}
              text={blogPost.description}
              path={blogPost.path}
            />
          );
        })
      }
    </div >
  );
}

export default Topics;
