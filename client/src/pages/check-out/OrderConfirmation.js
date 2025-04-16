import React from 'react';
import "../../assets/css/orderConfirmation.css";


function OrderConfirmation() {
    return (
        <div className="modern-confirmation-page">
          <div className="modern-confirmation-container">
            <div className="confirmation-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="modern-confirmation-heading">Order Confirmed!</h1>
            <p className="modern-confirmation-message">
              Your order has been successfully processed. Thank you for your purchase.
            </p>
            <a href="/" className="modern-home-button">
              Back to Home
            </a>
          </div>
        </div>
      );
    
}

export default OrderConfirmation;