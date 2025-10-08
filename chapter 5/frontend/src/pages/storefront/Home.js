// src/pages/storefront/HomePage.js

import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to Streamify</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <section className="featured">
          <h2>Featured Videos</h2>
          {/* Display featured videos here */}
        </section>
        <section className="categories">
          <h2>Categories</h2>
          {/* Display categories here */}
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Streamify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
