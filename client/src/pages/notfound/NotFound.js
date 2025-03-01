import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/notfound.css"; // CSS Import

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="notfound-button">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;