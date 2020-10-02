import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const SideBar = ({ topic, changeBlog }) => {
    const [topicList, setTopicList] = useState([]);
    const [accordionState, setAccordionState] = useState({});
    const [testState, setTestState] = useState(true);

    const createFileList = async () => {
        const response = await fetch(process.env.PUBLIC_URL + `/blog_articles/files.json`);
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

    useEffect(() => {
        createFileList();
    }, [])

    const toggleAccordion = (topic) => {
        // let newState = {}
        // newState[topic] = !accordionState[topic]
        // setAccordionState(Object.assign(accordionState, newState))
        setTestState(!testState)
        // console.log("toggles", accordionState)

        let stateCopy = accordionState
        const newValue = !accordionState[topic]
        for (const key in stateCopy) {
            stateCopy[key] = false;
        }
        stateCopy[topic] = newValue;
        setAccordionState(stateCopy)
    }

    return (
        <div className="sidebar">
            <div class="navbar-brand" href="#">Callum Lamont</div>
            <div className="sidebar-block">
                <div className="sidebar-title">
                    About
                </div>
            </div>
            {
                topicList.map((topic) => {
                    return (
                        <div className="sidebar-block">
                            {/* Put some logic in here that will link to individual page - or this could just always link to a summary page */}
                            <div className="sidebar-title" onClick={() => {
                                toggleAccordion(topic.topic);
                            }}>
                                {topic.topic}
                            </div>
                            <CSSTransition in={accordionState[topic.topic]}
                                classNames="sidebar-test"
                                timeout={{ appear: 0, enter: 0, exit: 3000 }}
                                appear
                                unmountOnExit>
                                <SideBarLinks topicList={topic.files} changeBlog={changeBlog} />
                            </CSSTransition>
                        </div>
                    )
                })
            }
            <div className="sidebar-block">
                <div className="sidebar-title">
                    Sketches
                </div>
            </div>
        </div >
    )
}

const SideBarLinks = ({ topicList, changeBlog }) => {
    return (
        <div>
            {
                topicList.map((entry) => {
                    return (
                        <a className="sidebar-links" href="#" onClick={() => changeBlog(entry)}>{entry.title}</a>
                    );
                })
            }
        </div>
    );
}

export default SideBar;
