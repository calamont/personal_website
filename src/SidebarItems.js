import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Link } from "react-router-dom";

import './SidebarItems.css';

const SidebarItems = ({ setSidebarState, setBlogText }) => {


  const [topicList, setTopicList] = useState([]);
  const [accordionState, setAccordionState] = useState({});
  const [testState, setTestState] = useState(true);

  // Get list of the blog topics and blog posts
  const createFileList = async () => {
    const response = await fetch(process.env.PUBLIC_URL + `/files.json`);
    const fileList = await response.json();
    setTopicList(fileList.topics)

    // Get sidebar accordion titles, initialising them as closed
    await fileList.topics.map((topic) => {
      let topicState = {};
      topicState[topic.topic] = false;
      setAccordionState(Object.assign(accordionState, topicState))
    })
  }

  // Collapse all open accordions in the sidebar
  const resetAccordion = () => {
    let stateCopy = accordionState
    for (const key in stateCopy) {
      stateCopy[key] = false;
    }
  }

  // Open or close an accordion when clicking the topic title
  const toggleAccordion = (topic) => {
    setTestState(!testState)  // why do the accordions break when I remove this??
    let stateCopy = accordionState
    const newValue = !accordionState[topic]
    stateCopy[topic] = newValue;
    setAccordionState(stateCopy)
  }

  // Change blog text when clicking on a link
  const changeBlog = (fileObj) => {
    fetch(process.env.PUBLIC_URL + `/${fileObj.file}`)
      .then(response => response.text())
      .then(text => setBlogText(text))
      .catch(err => console.log("ERROR", err))
    resizeLog();
  }

  // Keep track of window size and hide sidebar if window is small
  const resizeLog = () => {
    const width = window.innerWidth;
    if (width < 800) {
      setSidebarState(false)
      resetAccordion()
    } else {
      setSidebarState(true)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeLog);
    createFileList();
  }, [])

  return (
    <div>
      <div className="topic">
        <div className="topic-title">
          about
        </div>
      </div>
      {
        topicList.map((topic) => {
          return (
            <div className="topic">
              <div className="topic-title" onClick={() => {
                toggleAccordion(topic.topic);
              }}>
                {topic.topic}
              </div>
              <CSSTransition in={accordionState[topic.topic]}
                classNames="topic-accordion"
                timeout={{ appear: 0, enter: 0, exit: 3000 }}
                appear
                unmountOnExit>
                <TopicLinks topic={topic} changeBlog={changeBlog} />
              </CSSTransition>
            </div>
          )
        })
      }
      <div className="topic">
        <div className="topic-title">
          sketches
          </div>
      </div>
    </div>
  )
}

const TopicLinks = ({ topic, changeBlog }) => {
  return (
    <div>
      <div className="topic-links" onClick={() => changeBlog(topic.readme)}>
        <Link to={`/${topic.readme.file}`}>
          {topic.readme.title}
        </Link>
      </div>
      {
        topic.files.map((entry) => {
          return (
            <div className="topic-links" onClick={() => changeBlog(entry)}>
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

export default SidebarItems;
