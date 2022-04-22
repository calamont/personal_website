import React from 'react'
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>
        Callum Lamont
      </Link>
      <label for={"header-accordion"} tabIndex={0}>
        <svg className="icon">
          <use className="vertical-cross" href="#line" />
          <use className="horizontal-cross" href="#line" />
        </svg>
      </label>
    </div>
  )
}

export default Header;
