import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Link } from "react-router-dom";

import './SidebarItems.css';

const SidebarItems = ({ setSidebarState, setContent }) => {


  const [topicList, setTopicList] = useState([]);
  const [accordionState, setAccordionState] = useState({});
  const [testState, setTestState] = useState(true);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + `/files.json`)
      .then(response => response.json())
      .then(fileList => {
        setTopicList(fileList.topics);
        fileList.topics.forEach((topic) => {
          let topicState = {};
          topicState[topic.topic] = false;
          setAccordionState(Object.assign(accordionState, topicState))
        })
      })
  }, [accordionState])  // TODO: is this the correct use of useEffect?

  // Open or close an accordion when clicking the topic title
  const toggleAccordion = (topic) => {
    setTestState(!testState)  // why do the accordions break when I remove this??
    let stateCopy = accordionState
    const newValue = !accordionState[topic]
    stateCopy[topic] = newValue;
    setAccordionState(stateCopy)
  }

  // Change blog text when clicking on a link
  const changeContent = (fileObj) => {
    setContent(fileObj);
    resizeListener();  // Is this needed here? If not we can get rid of this whole function.
  }

  // Keep track of window size and hide sidebar if window is small
  const resizeListener = useCallback(() => {

    // Collapse all open accordions in the sidebar
    const resetAccordion = () => {
      let stateCopy = accordionState
      for (const key in stateCopy) {
        stateCopy[key] = false;
      }
    }

    const width = window.innerWidth;
    if (width < 800) {
      setSidebarState(false)
      resetAccordion()
    } else {
      setSidebarState(true)
    }
  }, [accordionState, setSidebarState])

  useEffect(() => {
    window.addEventListener("resize", resizeListener)
    // clean up
    return () => window.removeEventListener('resize', resizeListener);
  }, [resizeListener])  // TODO: is this the correct use of useEffect?

  return (
    <div>
      <div className="topic">
        <div className="topic-title">
          <Link to="/about">
            about
          </Link>
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
                <TopicLinks topic={topic} changeContent={changeContent} />
              </CSSTransition>
            </div>
          )
        })
      }
    </div>
  )
}

const TopicLinks = ({ topic, changeContent }) => {
  return (
    <div>
      <div className="topic-links" onClick={() => changeContent(topic.readme)}>
        <Link to={`/${topic.readme.file}`}>
          {topic.readme.title}
        </Link>
      </div>
      {
        topic.files.map((entry) => {
          return (
            <div className="topic-links" onClick={() => changeContent(entry)}>
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
