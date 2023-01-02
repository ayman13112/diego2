// create a navigation bar
import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div class="logo">Logo</div>
      <input type="checkbox" id="nav-toggle" class="nav-toggle" />
      <label for="nav-toggle" class="nav-toggle-label">
        <i class="menu-icon fas fa-bars"></i>
        <i class="menu-icon fas fa-times"></i>
      </label>
      <ul class="nav-links">
        <li>
          <a href="#" class="nav-link">
            <i class="fas fa-home"></i> Home
          </a>
        </li>
        <li>
          <a href="#" class="nav-link">
            <i class="fas fa-user"></i> About
          </a>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link dropdown-toggle">
            <i class="fas fa-th-list"></i> Menu
          </a>
          <ul class="dropdown-content">
            <li>
              <a href="#" class="dropdown-link">
                Option 1
              </a>
            </li>
            <li>
              <a href="#" class="dropdown-link">
                Option 2
              </a>
            </li>
            <li>
              <a href="#" class="dropdown-link">
                Option 3
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <form class="search-form">
        <input type="text" placeholder="Search..." />
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
