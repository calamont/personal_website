import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header-links">
        <Link to="/about">about</Link>
      </div>
      <div className="header-title">Callum Lamont</div>
      <div className="header-links">
        <Link to="/blog">blog</Link>
      </div>
    </div>
  );
};

export default Header;
