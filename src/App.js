import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import './App.css';

const App = () => {

  const [blogText, setBlogText] = useState("");
  const changeBlog = (fileObj) => {
    fetch(process.env.PUBLIC_URL + `/${fileObj.file}`)
      .then(response => response.text())
      .then(text => setBlogText(text))
      .catch(err => console.log("ERROR", err))
    resizeLog();
  }

  const [topicList, setTopicList] = useState([]);
  const [accordionState, setAccordionState] = useState({});
  const [testState, setTestState] = useState(true);
  // Uncomment below to have a side that toggles
  const [sidebarState, setSidebarState] = useState(true)
  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    console.log("pressed", sidebarState)
  }

  const createFileList = async () => {
    const response = await fetch(process.env.PUBLIC_URL + `/files.json`);
    const fileList = await response.json();
    setTopicList(fileList.topics)

    await fileList.topics.map((topic) => {
      console.log(topic)
      let topicState = {};
      topicState[topic.topic] = false;
      setAccordionState(Object.assign(accordionState, topicState))
      console.log("acc", accordionState)
    })
  }

  const renderMath = () => {
    if ("MathJax" in window) {
      console.log("finding mathhhhs")
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
      ])
    }
  }
  renderMath()

  const resizeLog = () => {
    const width = window.innerWidth;
    console.log(width);
    if (width < 800) {
      setSidebarState(false)
      resetAccordion()
    } else {
      setSidebarState(true)
    }
  }

  useEffect(() => {
    createFileList();
    window.addEventListener("resize", resizeLog);
  }, [])

  const toggleAccordion = (topic) => {
    setTestState(!testState)
    let stateCopy = accordionState
    const newValue = !accordionState[topic]
    // Uncomment below to just have one accordion open
    // for (const key in stateCopy) {
    //   stateCopy[key] = false;
    // }

    stateCopy[topic] = newValue;
    setAccordionState(stateCopy)
  }

  const resetAccordion = () => {
    let stateCopy = accordionState
    for (const key in stateCopy) {
      stateCopy[key] = false;
    }
  }

  return (
    <Router>
      <div>Hello!!</div>
      <div className="sidebar">
        <div class="callum-header" href="#">
          <span>Callum Lamont</span>
          <span className="navbar-toggle" onClick={toggleSidebar}>x</span>
        </div>
        <CSSTransition in={sidebarState}
          classNames="sidebar-toggle"
          timeout={{ appear: 0, enter: 0, exit: 3000 }}
          appear
          unmountOnExit>
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
        </CSSTransition>
      </div >
      <div>
        <Route path="/:filepath" render={() => (
          <BlogPost blogText={blogText} />
        )} />
      </div>
    </Router>
  );
}

const BlogPost = ({ blogText }) => {
  const renderMath = () => {
    console.log("Not in windowwwww")
    console.log("MathJax" in window)
    console.log(Object.getOwnPropertyNames(window).sort())
    console.log(window)
    if ("MathJax" in window) {
      console.log("finding mathhhhs")
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
      ])
    }
  }
  return (
    <div className="main-content">
      <div className="blog-text" dangerouslySetInnerHTML={{ __html: blogText }} />
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

export default App;
