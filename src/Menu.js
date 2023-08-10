import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <div>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`menu ${menuOpen ? 'menu-open' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="menu-link">Home</Link>
            </li>
            <li>
              <Link to="/why-we-do" className="menu-link">Our Mission</Link>
            </li>
            <li>
              <Link to="/webcam" className="menu-link">Our Solution</Link>
            </li>
            
          </ul>
        </nav>
      </div>
    );
  };
  

export default Menu;
