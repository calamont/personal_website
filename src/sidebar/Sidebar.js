import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../Accordion.css";
// import "./Header.css";
import "./Sidebar.css";

const Sidebar = ({ setContent }) => {

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + `/files.json`)
      .then(response => response.json())
      .then(fileList => {
        setFileList(fileList.files)
      })
  }, [])

  // Change blog text when clicking on a link
  const changeContent = (fileObj) => {
    setContent(fileObj);
  }

  return (
    <div className="sidebar accordion-links" tabIndex={0}>
      <div className="sidebar-title">
        <Link to="/about">
          about
        </Link>
      </div>
      <SidebarItem topic={fileList} changeContent={changeContent} />
    </div>
  )
}

const SidebarItem = ({ topic, changeContent }) => {

  const onLinkClick = (file) => {
    changeContent(file);
  }

  return (
    <div>
      <input type="checkbox" className="sidebar-input accordion-input" name="example_accordion" id={"blog-sidebar"} tabIndex={0} />
      <label for="blog-sidebar" className="sidebar-title accordion-title" tabIndex={0}>
        blog
      </label>
      {
        topic.map((entry) => {
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

export default Sidebar;
