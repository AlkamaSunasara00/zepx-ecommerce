// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/feedback.css";
// import { useNavigate } from "react-router-dom";

// const port = process.env.REACT_APP_URL;

// function FeedBack() {
//   const [fetchfeedback, setfetchFeedback] = useState([]);
//   const [feedback, setFeedback] = useState(""); // Simplified state
//   const userId = localStorage.getItem("user_id"); // Get user ID directly


//   useEffect(() => {
//     getfeedback();
//   }, []);
//   const navigate = useNavigate()

//   const getfeedback = async () => {
//     try {
//       const res = await axios.get(`${port}/getfeedback`);
//       setfetchFeedback(res.data);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };


//   const handlesubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//         alert("User not logged in. Please login to give feedback");
//         navigate("/login");
//         return;
//     }

//     // Fetch username from localStorage again (with fallback)
//     const username = localStorage.getItem("username") || "Anonymous"; 

//     const requestData = {
//         user_id: userId,
//         username: username, // Now properly fetched
//         feedback: feedback,
//     };

//     console.log("Submitting Feedback Data:", requestData); // Debugging log

//     try {
//         await axios.post(`${port}/addfeedback`, requestData);
//         setFeedback("");
//         alert("Thank you for your feedback!");
//         getfeedback();
//     } catch (error) {
//         console.error("Error submitting feedback:", error);
//         alert("Failed to submit feedback. Please try again later.");
//     }
// };

  
  
  
//   // const handlesubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!userId) {
//   //     alert("User not logged in. Please login to give feedback");
//   //     navigate("/login") // Clearer message
//   //     return;
//   //   }

//   //   try {
//   //     await axios.post(`${port}/addfeedback`, {
//   //       user_id: userId, // Use userId directly from localStorage
//   //       feedback: feedback, // Use the feedback state
//   //     });

//   //     setFeedback(""); // Clear input field
//   //     alert("Thank you for your feedback!");
//   //     getfeedback(); // Refresh feedback list
//   //   } catch (error) {
//   //     console.error("Error submitting feedback:", error);
//   //     alert("Failed to submit feedback. Please try again later."); // User-friendly message
//   //   }
//   // };

//   return (
//     <div className='feedback-container'>
//       <div className='sub-feedback'>
//         <div className='sub1-feedback'>
//           <h2>We Value Your Feedback</h2>
//           <p>Share your thoughts with us. We’d love to hear from you!</p>
//           <form className="feedback-form" onSubmit={handlesubmit}>
//             <div className="feedback-message">
//               <input
//                 type="text"
//                 placeholder="Write your feedback here..."
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 required
//               />
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//         <div className='sub2-feedback'>
//           <div className='feedback-img'>
//             <img src={require('../../assets/images/feedback.png')} alt="Feedback" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeedBack;

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/feedback.css";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const port = process.env.REACT_APP_URL;

// function FeedBack() {
//   const [fetchfeedback, setfetchFeedback] = useState([]);
//   const [feedback, setFeedback] = useState(""); 
//   const userId = localStorage.getItem("user_id"); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     getfeedback();
//   }, []);

//   const getfeedback = async () => {
//     try {
//       const res = await axios.get(`${port}/getfeedback`);
//       setfetchFeedback(res.data);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//         alert("User not logged in. Please login to give feedback");
//         navigate("/login");
//         return;
//     }

//     const username = localStorage.getItem("username") || "Anonymous"; 

//     const requestData = {
//         user_id: userId,
//         username: username,
//         feedback: feedback,
//     };

//     try {
//         await axios.post(`${port}/addfeedback`, requestData);
//         setFeedback("");
//         alert("Thank you for your feedback!");
//         getfeedback();
//     } catch (error) {
//         console.error("Error submitting feedback:", error);
//         alert("Failed to submit feedback. Please try again later.");
//     }
//   };

//   return (
//     <motion.div 
//       className="feedback-container"
//       initial={{ opacity: 0, y: 50 }} 
//       whileInView={{ opacity: 1, y: 0 }} 
//       transition={{ duration: 0.8, ease: "easeOut" }} 
//       viewport={{ once: true }}
//     >
//       <motion.div 
//         className="sub-feedback"
//         initial={{ scale: 0.9 }} 
//         whileInView={{ scale: 1 }} 
//         transition={{ duration: 0.9, ease: "easeInOut" }} 
//         viewport={{ once: true }}
//       >
//         <div className="sub1-feedback">
//           <motion.h2 
//             initial={{ opacity: 0, x: -50 }} 
//             whileInView={{ opacity: 1, x: 0 }} 
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             We Value Your Feedback
//           </motion.h2>
//           <motion.p 
//             initial={{ opacity: 0, x: -50 }} 
//             whileInView={{ opacity: 1, x: 0 }} 
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             Share your thoughts with us. We’d love to hear from you!
//           </motion.p>
//           <motion.form 
//             className="feedback-form" 
//             onSubmit={handlesubmit}
//             initial={{ opacity: 0, scale: 0.8 }} 
//             whileInView={{ opacity: 1, scale: 1 }} 
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <div className="feedback-message">
//               <input
//                 type="text"
//                 placeholder="Write your feedback here..."
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 required
//               />
//               <button type="submit">
//                 Submit
//               </button>
//             </div>
//           </motion.form>
//         </div>
//         <motion.div 
//           className="sub2-feedback"
//           initial={{ opacity: 0, x: 50 }} 
//           whileInView={{ opacity: 1, x: 0 }} 
//           transition={{ duration: 0.9, delay: 0.5 }}
//         >
//           <div className="feedback-img">
//             <img src={require("../../assets/images/feedback.png")} alt="Feedback" />
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FeedBack;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/feedback.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const port = process.env.REACT_APP_URL;

function FeedBack() {
  const [fetchfeedback, setfetchFeedback] = useState([]);
  const [feedback, setFeedback] = useState(""); 
  const userId = localStorage.getItem("user_id"); 
  const navigate = useNavigate();

  useEffect(() => {
    getfeedback();
  }, []);

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

    const username = localStorage.getItem("username") || "Anonymous"; 

    const requestData = {
        user_id: userId,
        username: username,
        feedback: feedback,
    };

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

  return (
    <div className="feedback-container" >
      <motion.div 
        className="sub-feedback"
        initial={{ scale: 0.9 }} 
        whileInView={{ scale: 1 }} 
        transition={{ duration: 0.9, ease: "easeInOut" }} 
        viewport={{ once: true }}>
        <div className="sub1-feedback">
        <motion.h2 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We Value Your Feedback
            </motion.h2>
          <p>
            Share your thoughts with us. We’d love to hear from you!
          </p>
          <form>
            <div className="feedback-message">
              <input
                type="text"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
          <div className="feedback-img">
            <img src={require("../../assets/images/feedback.png")} alt="Feedback" />
          </div>
      </motion.div>
    </div>
  );
}

export default FeedBack;
