import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Link } from "react-router-dom";

const SidebarItems = ({ setSidebarState, setBlogText }) => {


  const [topicList, setTopicList] = useState([]);
  const [accordionState, setAccordionState] = useState({});
  const [testState, setTestState] = useState(true);

  // Get list of the blog topics and blog posts
  const createFileList = async () => {
    const response = await fetch(process.env.PUBLIC_URL + `/files.json`);
    const fileList = await response.json();
    setTopicList(fileList.topics)

    await fileList.topics.map((topic) => {
      let topicState = {};
      topicState[topic.topic] = false;
      setAccordionState(Object.assign(accordionState, topicState))
    })
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

  // Collapse all open accordions in the sidebar
  const resetAccordion = () => {
    let stateCopy = accordionState
    for (const key in stateCopy) {
      stateCopy[key] = false;
    }
  }

  // Open or close an accordion when clicking the theme title
  const toggleAccordion = (topic) => {
    setTestState(!testState)
    let stateCopy = accordionState
    const newValue = !accordionState[topic]
    stateCopy[topic] = newValue;
    setAccordionState(stateCopy)
  }

  useEffect(() => {
    window.addEventListener("resize", resizeLog);
    createFileList();
  }, [])

  return (
    <div>
      <div className="theme-chunk">
        <div className="theme-title">
          About
        </div>
      </div>
      {
        topicList.map((topic) => {
          return (
            <div className="theme-chunk">
              <div className="theme-title" onClick={() => {
                toggleAccordion(topic.topic);
              }}>
                {topic.topic}
              </div>
              <CSSTransition in={accordionState[topic.topic]}
                classNames="theme-accordion"
                timeout={{ appear: 0, enter: 0, exit: 3000 }}
                appear
                unmountOnExit>
                <ThemeLinks topicList={topic.files} changeBlog={changeBlog} />
              </CSSTransition>
            </div>
          )
        })
      }
      <div className="theme-chunk">
        <div className="theme-title">
          Sketches
          </div>
      </div>
    </div>
  )
}

const ThemeLinks = ({ topicList, changeBlog }) => {
  return (
    <div>
      {
        topicList.map((entry) => {
          return (
            <div className="theme-links" onClick={() => changeBlog(entry)}>
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
