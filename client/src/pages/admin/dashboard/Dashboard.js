import React, { useEffect, useState } from "react";
import "../../../assets/css/admin/dashboard.css";
import axios from "axios";

function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [animationStart, setAnimationStart] = useState(false);
  const text = ["WELCOME", "BACK,"];

  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");
    if (!adminId) {
      console.log("No admin ID found in localStorage!");
      return;
    }

    // Fetch Admin Details
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4800/getadminbyid/${adminId}`);
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdminDetails();

    setTimeout(() => {
      setAnimationStart(true);
    }, 500);
  }, []);

  return (
    <div id="dashboard-container">
      <h1 className="welcome-text">
        <div className="word-group">
          {text[0].split("").map((letter, index) => (
            <span key={index} className="bounce-letter" style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>
        
        <div className="word-group">
          {text[1].split("").map((letter, index) => (
            <span key={index} className="bounce-letter" style={{ animationDelay: `${(index + text[0].length) * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </div>

        <span className={`admin-name ${animationStart ? "slide-in" : ""}`}>
          {admin ? admin.username : "Admin"}
        </span>
      </h1>
    </div>
  );
}

export default Dashboard;

