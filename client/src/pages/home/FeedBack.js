import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/feedback.css";
import { useNavigate } from "react-router-dom";

const port = process.env.REACT_APP_URL;

function FeedBack() {
  const [fetchfeedback, setfetchFeedback] = useState([]);
  const [feedback, setFeedback] = useState(""); // Simplified state
  const userId = localStorage.getItem("user_id"); // Get user ID directly


  useEffect(() => {
    getfeedback();
  }, []);
  const navigate = useNavigate()

  const getfeedback = async () => {
    try {
      const res = await axios.get(`${port}/getfeedback`);
      setfetchFeedback(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };


  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
        alert("User not logged in. Please login to give feedback");
        navigate("/login");
        return;
    }

    // Fetch username from localStorage again (with fallback)
    const username = localStorage.getItem("username") || "Anonymous"; 

    const requestData = {
        user_id: userId,
        username: username, // Now properly fetched
        feedback: feedback,
    };

    console.log("Submitting Feedback Data:", requestData); // Debugging log

    try {
        await axios.post(`${port}/addfeedback`, requestData);
        setFeedback("");
        alert("Thank you for your feedback!");
        getfeedback();
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again later.");
    }
};

  
  
  
  // const handlesubmit = async (e) => {
  //   e.preventDefault();

  //   if (!userId) {
  //     alert("User not logged in. Please login to give feedback");
  //     navigate("/login") // Clearer message
  //     return;
  //   }

  //   try {
  //     await axios.post(`${port}/addfeedback`, {
  //       user_id: userId, // Use userId directly from localStorage
  //       feedback: feedback, // Use the feedback state
  //     });

  //     setFeedback(""); // Clear input field
  //     alert("Thank you for your feedback!");
  //     getfeedback(); // Refresh feedback list
  //   } catch (error) {
  //     console.error("Error submitting feedback:", error);
  //     alert("Failed to submit feedback. Please try again later."); // User-friendly message
  //   }
  // };

  return (
    <div className='feedback-container'>
      <div className='sub-feedback'>
        <div className='sub1-feedback'>
          <h2>We Value Your Feedback</h2>
          <p>Share your thoughts with us. We’d love to hear from you!</p>
          <form className="feedback-form" onSubmit={handlesubmit}>
            <div className="feedback-message">
              <input
                type="text"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='sub2-feedback'>
          <div className='feedback-img'>
            <img src={require('../../assets/images/feedback.png')} alt="Feedback" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBack;