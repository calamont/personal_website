import React from 'react'
import './Header.css';
import "../Accordion.css";

// TODO: Make clicking 'Callum Lamont' drop down the sidebar accordion
const Header = () => {
  return (
    <div className="header">
      Callum Lamont
      <label for={"header-accordion"} className="accordion-title" tabIndex={0}>
        <svg className="icon">
          <use className="vertical-cross" href="#line" />
          <use className="horizontal-cross" href="#line" />
        </svg>
      </label>
    </div>
  )
}

export default Header;
