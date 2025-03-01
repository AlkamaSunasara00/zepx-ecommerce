import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../../assets/css/banner.css"

function Banner() {


    const [banner, setbanner] = useState([]);


useEffect(() => {
  const fetchbanner = async () => {
      try {
          const response = await axios.get(`http://localhost:4800/getbanner`);
          if (response.data.length > 0) {
            setbanner(response.data[0]); 
              console.log(response.data[0])
          }
      } catch (error) {
          console.error("Error fetching offer:", error);
      }
  };

  fetchbanner();
}, []);


  return (
    <div>
      
      <div className='container'>
        <div className='banner'>
          <div className='banner-section'>
            <div className='banner-section-about'>
              <h2>zepX. Giving Most Affordable products</h2>
              <p>Find the best, reliable and affordable products here. We focus on the product quality. Here you can find all the products ever made. Even the products officially stopped selling. So why you are waiting? Just order now!</p>
            </div>
            <div className='banner-section-img'>
            {banner ? (
              <div className='banner-img'>
                 <img src={`./uploads/${banner.img}`} alt="banner"/>
              </div>
                ) : (
                  <div className="loading-container">
                      <p>Loading offers</p>
                      <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Banner
