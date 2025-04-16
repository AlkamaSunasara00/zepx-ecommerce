// import React, { useRef, useEffect, useState } from "react";
// import "../../assets/css/about.css";
// import Footer from '../footer/Footer';
// import Navbar from '../navbar/Navbar';

// function About() {

//   const videoRef = useRef(null);
//   const [hasPlayed, setHasPlayed] = useState(false);

  // useEffect(() => {
  //     const observer = new IntersectionObserver(
  //         ([entry]) => {
  //             if (entry.isIntersecting && !hasPlayed) {
  //                 videoRef.current.play();
  //                 setHasPlayed(true); // Prevent replay
  //             }
  //         },
  //         { threshold: 0.5 } // Adjust threshold as needed
  //     );

  //     if (videoRef.current) {
  //         observer.observe(videoRef.current);
  //     }

  //     return () => observer.disconnect();
  // }, [hasPlayed]);
//   return (
//     <>
//     <Navbar/>
//       <div className="about-container">
//         <div className="about-content">
// <div className="header-container">
//   <h1>About the zepX.electronics</h1>
//   <div className="imgs">
//     <div className="sub1-img">
//       <div className="item-img">
//       <a href="https://www.instagram.com/solitary_off" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/alkama.jpg')} alt="Alkama" />
//         <span><p>Alkama</p></span></a>
//       </div>
//       <div className="item-img">
//       <a href="https://www.instagram.com/mr_hammad_04x" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/hammad.jpg')} alt="Hammad" />
//         <span><p>Hammad</p></span></a>
//       </div>
//       <div className="item-img">
//       <a href="https://www.instagram.com/asrar_maknojiya786" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/asrar.jpg')} alt="Asrar" />
//         <span><p>Asrar</p></span></a>
//       </div>
//     </div>
//     <div className="vertical-line"></div>
//     <div className="sub2-img">
//       <p>24 January 2025</p>
//     </div>
//   </div>
//   <div className='paragrap'>
//     <p>Welcome to ZepX Electronics, your trusted marketplace for a wide range of electronics from the world’s top brands. Whether you're searching for the latest gadgets, everyday essentials, or specialized tech products, we connect you with the best options—all in one convenient place.</p>
//   </div>
// </div>
// <div className='video-container'>
//   <video  muted ref={videoRef}>
//     <source src={require('../../assets/images/about.mp4')} />
//   </video>
// </div>
// <div className='all-about'>
//   <div className='sub1-about'>
//     <h4>Who We Are</h4>
//     <p>ZepX Electronics is an online platform dedicated to bringing technology closer to you. As a multi-brand e-commerce marketplace, we don’t manufacture our own products; instead, we partner with reliable sellers and trusted brands to offer you a vast selection of electronics, all at competitive prices.</p>

//     <h4>What We Offer</h4>
//     <ul>
//       <li><b>Extensive Product Range:</b> From smartphones and laptops to smart home devices and accessories, we offer thousands of products from leading global brands.</li>
//       <li><b>Trusted Sellers:</b> Every product listed on our platform comes from verified sellers to ensure quality and reliability.</li>
//       <li><b>Competitive Pricing:</b> Enjoy great deals and discounts across our entire product range.</li>
//       <li><b>Easy Shopping Experience:</b> Our user-friendly website and advanced search tools make finding your desired product quick and easy.</li>
//       <li><b>Fast & Secure Delivery:</b> We ensure timely delivery with reliable logistics partners.
//       </li>
//       <li><b>Hassle-Free Returns:</b> If something isn’t right, our straightforward return policy has you covered.</li>
//     </ul>

//     <h4>Why Shop With Us?</h4>
//     <p>At ZepX Electronics, we prioritize trust, convenience, and customer satisfaction. By curating products from trusted sellers, we ensure that you get access to the latest electronics without the hassle of visiting multiple stores. Our goal is to make shopping for electronics as simple and seamless as possible.</p>

//     <h1><i>" ZepX: Bridging the gap between you  and the future. "</i></h1>

//     <h4>Our Vision</h4>
//     <p>We aim to be the leading e-commerce platform for electronics, empowering our customers with the best technology and creating a marketplace that is trusted by both buyers and sellers.</p>
//     <h4>Contact Us</h4>
//     <p>Have questions or need assistance? Reach out to us at <b><a href="https://mail.google.com/mail/?view=cm&fs=1&to=zepx2025@gmail.com" target="_blank" rel="noopener noreferrer">zepx2025@gmail.com</a></b> and our friendly customer service team will be happy to help!</p>
//   </div>
//   <div className='sub2-about'>
//     <div className='sub2-icon'>
//       <div className='about-icon1'><h4>Share</h4></div>
//       <div className='about-icon'><i class="fa-brands fa-facebook"></i></div>
//       <div className='about-icon'><a href="https://www.instagram.com/zepx.electronics" target="_blank" rel="noopener noreferrer">
//         <i className="fa-brands fa-instagram"></i>
//       </a></div>
//       <div className='about-icon'><i class="fa-brands fa-youtube"></i></div>
//       <div className='about-icon'><i class="fa-brands fa-twitter"></i></div>
//     </div>
//   </div>
// </div>
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default About;











import React, { useRef, useEffect, useState } from "react";
import "../../assets/css/about.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function About() {
  const videoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  useEffect(() => {
    // Observer for the whole page animation (0.1 threshold)
    const pageObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        },{ threshold: 0.1 }
    );
    // Observer for the video playback (0.5 threshold)
    const videoObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !hasPlayed) {
                videoRef.current.play();
                setHasPlayed(true);
            }
        },{ threshold: 0.4 }
    );
    if (videoRef.current) {
        videoObserver.observe(videoRef.current);
        pageObserver.observe(document.querySelector(".about-content")); // Observe the main content div
    }
    return () => {
        videoObserver.disconnect();
        pageObserver.disconnect();
    };
}, [hasPlayed]);

  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className={`about-content ${isVisible ? "fade-in" : ""}`}>
          <div className="header-container">
            <h1>About the zepX.electronics</h1>
            <div className="imgs">
              <div className="sub1-img">
                <div className="item-img">
                  <a href="https://www.instagram.com/solitary_off" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/alkama.jpg')} alt="Alkama" />
                    <span><p>Alkama</p></span></a>
                </div>
                <div className="item-img">
                  <a href="https://www.instagram.com/mr_hammad_04x" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/hammad.jpg')} alt="Hammad" />
                    <span><p>Hammad</p></span></a>
                </div>
                <div className="item-img">
                  <a href="https://www.instagram.com/asrar_maknojiya786" target="_blank" rel="noopener noreferrer"><img src={require('../../assets/images/asrar.jpg')} alt="Asrar" />
                    <span><p>Asrar</p></span></a>
                </div>
              </div>
              <div className="vertical-line"></div>
              <div className="sub2-img">
                <p>24 January 2025</p>
              </div>
            </div>
            <div className='paragrap'>
              <p>Welcome to ZepX Electronics, your trusted marketplace for a wide range of electronics from the world’s top brands. Whether you're searching for the latest gadgets, everyday essentials, or specialized tech products, we connect you with the best options—all in one convenient place.</p>
            </div>
          </div>
          <div className='video-container'>
            <video muted ref={videoRef}>
              <source src={require('../../assets/images/about.mp4')} />
            </video>
          </div>
          <div className='all-about'>
            <div className='sub1-about'>
              <h4>Who We Are</h4>
              <p>ZepX Electronics is an online platform dedicated to bringing technology closer to you. As a multi-brand e-commerce marketplace, we don’t manufacture our own products; instead, we partner with reliable sellers and trusted brands to offer you a vast selection of electronics, all at competitive prices.</p>

              <h4>What We Offer</h4>
              <ul>
                <li><b>Extensive Product Range:</b> From smartphones and laptops to smart home devices and accessories, we offer thousands of products from leading global brands.</li>
                <li><b>Trusted Sellers:</b> Every product listed on our platform comes from verified sellers to ensure quality and reliability.</li>
                <li><b>Competitive Pricing:</b> Enjoy great deals and discounts across our entire product range.</li>
                <li><b>Easy Shopping Experience:</b> Our user-friendly website and advanced search tools make finding your desired product quick and easy.</li>
                <li><b>Fast & Secure Delivery:</b> We ensure timely delivery with reliable logistics partners.
                </li>
                <li><b>Hassle-Free Returns:</b> If something isn’t right, our straightforward return policy has you covered.</li>
              </ul>

              <h4>Why Shop With Us?</h4>
              <p>At ZepX Electronics, we prioritize trust, convenience, and customer satisfaction. By curating products from trusted sellers, we ensure that you get access to the latest electronics without the hassle of visiting multiple stores. Our goal is to make shopping for electronics as simple and seamless as possible.</p>

              <h1><i>" ZepX: Bridging the gap between you  and the future. "</i></h1>

              <h4>Our Vision</h4>
              <p>We aim to be the leading e-commerce platform for electronics, empowering our customers with the best technology and creating a marketplace that is trusted by both buyers and sellers.</p>
              <h4>Contact Us</h4>
              <p>Have questions or need assistance? Reach out to us at <b><a href="https://mail.google.com/mail/?view=cm&fs=1&to=zepx2025@gmail.com" target="_blank" rel="noopener noreferrer">zepx2025@gmail.com</a></b> and our friendly customer service team will be happy to help!</p>
            </div>
            <div className='sub2-about'>
              <div className='sub2-icon'>
                <div className='about-icon1'><h4>Share</h4></div>
                <div className='about-icon'><i class="fa-brands fa-facebook"></i></div>
                <div className='about-icon'><a href="https://www.instagram.com/zepx.electronics" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a></div>
                <div className='about-icon'><i class="fa-brands fa-youtube"></i></div>
                <div className='about-icon'><i class="fa-brands fa-twitter"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;