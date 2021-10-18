import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../Accordion.css";
// import "./Header.css";
import "./Sidebar.css";

const Sidebar = ({ setContent }) => {

  const [topicList, setTopicList] = useState([]);
  // const [accordionState, setAccordionState] = useState({});
  // const [testState, setTestState] = useState(true);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + `/files.json`)
      .then(response => response.json())
      .then(fileList => {
        setTopicList(fileList.topics);
        fileList.topics.forEach((topic) => {
          let topicState = {};
          topicState[topic.topic] = false;
          // setAccordionState(Object.assign(accordionState, topicState))
        })
      })
  }, [])

  // Change blog text when clicking on a link
  const changeContent = (fileObj) => {
    setContent(fileObj);
    // resizeListener();  // Is this needed here? If not we can get rid of this whole function.
  }

  return (
    <div className="sidebar accordion-links" tabIndex={0}>
      <div className="sidebar-title" onClick={closeAccordions}>
        <Link to="/about">
          about
        </Link>
      </div>
      {
        topicList.map(topic => {
          return (
            <SidebarItem topic={topic} changeContent={changeContent} />
          )
        })
      }
    </div>
  )
}

const closeAccordions = () => {
  const cbs = document.querySelectorAll('input');
  cbs.forEach((cb) => {
    cb.checked = false;
  });
}

const SidebarItem = ({ topic, changeContent }) => {

  const onLinkClick = (file) => {
    closeAccordions();
    // update the selected text
    changeContent(file);
  }

  return (
    <div>
      <input type="checkbox" className="sidebar-input accordion-input" name="example_accordion" id={topic.topic} tabIndex={0} />
      <label for={topic.topic} className="sidebar-title accordion-title" tabIndex={0}>
        {topic.topic}
      </label>
      <div className="sidebar-links accordion-links" onClick={() => onLinkClick(topic.readme)}>
        <Link to={`/${topic.readme.file}`}>
          {topic.readme.title}
        </Link>
      </div>
      {
        topic.files.map((entry) => {
          return (
              <div className="sidebar-links accordion-links" onClick={() => onLinkClick(entry)}>
                <Link to={`/${entry.file}`}>
                  {entry.title}
                </Link>
              </div>
          );
        })
      }
    </div>
  )
}

const TopicLinks = ({ topic, changeContent }) => {

  const onLinkClick = (file) => {
    // close all open accordions
    const cbs = document.querySelectorAll('input');
    cbs.forEach((cb) => {
      cb.checked = false;
    });
    // update the selected text
    changeContent(file)
  }

  return (
    <div>
      <div onClick={() => onLinkClick(topic.readme)}>
        <Link to={`/${topic.readme.file}`}>
          {topic.readme.title}
        </Link>
      </div>
      {
        topic.files.map((entry) => {
          return (
              <div onClick={() => onLinkClick(entry)}>
                <Link to={`/${entry.file}`}>
                  {entry.title}
                </Link>
              </div>
          );
        })
      }
    </div>
  );
}

export default Sidebar;
