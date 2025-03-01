import React, { useState, useEffect } from "react";
import "../../assets/css/review.css"; // Import CSS

const reviews = [
  { name: "John Doe", review: "Amazing product! Highly recommend.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Jane Smith", review: "Great quality and fast delivery.", rating: "⭐⭐⭐⭐" },
  { name: "Michael Brown", review: "Loved it! Will buy again.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Sarah Wilson", review: "Decent experience but room for improvement.", rating: "⭐⭐⭐" },
  { name: "David Lee", review: "Best purchase ever! Worth every penny.", rating: "⭐⭐⭐⭐⭐" },
  { name: "Emily Clark", review: "Super fast delivery and great service!", rating: "⭐⭐⭐⭐" }
];

function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3); // Default: Show 3 slides

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1); 
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2); // Tablet: Show 2 reviews
      } else {
        setSlidesToShow(3); // Desktop: Show 3 reviews
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const totalSlides = reviews.length; // Total reviews

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < totalSlides ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : totalSlides - 1
    );
  };

  return (
    <div className="review-slider">
      <button className="prev1-btn" onClick={prevSlide}>&#10094;</button>
      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
          }}
        >
          {reviews.map((review, index) => (
            <div className="slide" key={index} style={{ flex: `0 0 ${100 / slidesToShow}%` }}>
              <div className="review-card">
                <p className="review-text">{review.review}</p>
                <p className="review-rating">{review.rating}</p>
                <h4 className="review-name">- {review.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="next1-btn" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default Review;
