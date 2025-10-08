// src/pages/storefront/HomePage.js

import React from "react";
import Header from "../../../features/Header/Header";
import AdminVideoList from "../../../features/AdminVideoList";
import "./Home.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container homepage">
        <main className="main-content">
          <section className="featured">
            {/* Display featured videos here */}
            <AdminVideoList />
          </section>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Streamify. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
