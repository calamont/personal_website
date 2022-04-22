import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Sidebar.css";

const closeAccordions = () => {
  const cbs = document.querySelectorAll('input');
  cbs.forEach((cb) => {
    cb.checked = false;
  });
}

// CHECKPOINT: Start providing doc strings for all the components
const Sidebar = () => {

  const [topicList, setTopicList] = useState([]);

  // TODO: The information that is listed in the sidebar is stored in an extrenal
  // JSON file, which needs to be loaded. Is there a cleaner approach to this?
  // e.g. could/should this be defined in code somewhere?
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + `/files.json`)
      .then(response => response.json())
      .then(fileList => {
        setTopicList(fileList.topics);
        // TODO: I think I can use `reduce` to generate the `topicState`
        // object here
        fileList.topics.forEach((topic) => {
          let topicState = {};
          topicState[topic.topic_path] = false;
        })
      })
  }, [])

  return (
    <div className="sidebar" tabIndex={0}>
      <div className="sidebar-title" onClick={closeAccordions}>
        <Link to="/about">
          about
        </Link>
      </div>
      {
        topicList.map(topic => {
          return (
            <SidebarItem topic={topic} />
          )
        })
      }
    </div>
  )
}

const SidebarItem = ({ topic }) => {

  return (
    <div>
      <input type="checkbox" className="sidebar-input" id={topic.topic} tabIndex={0} />
      <label for={topic.topic} className="sidebar-title" tabIndex={0}>
        {topic.topic}
      </label>
      {
        topic.files.map((entry) => {
          return (
              <div className="sidebar-links" onClick={closeAccordions}>
                <Link to={`/${topic.topic_path}/${entry.file}`}>
                  {entry.title}
                </Link>
              </div>
          );
        })
      }
    </div>
  )
}
export default Sidebar;
