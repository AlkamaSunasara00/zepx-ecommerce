import React from 'react'
import "../../assets/css/footer.css"

function Footer() {
    return (
        <div>
            <div className='container'>
                <div className="main-footer-section">
                    <div className="footer">
                        <div className="footer-section">
                            <div className="footer-info">
                                <div className="footer-list">
                                    <ul>
                                        <li><h5>INFO</h5></li>
                                        <li><p>Company</p></li>
                                        <li><p>Products</p></li>
                                        <li><p>Engineering</p></li>
                                        <li><p>Productions</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-about">

                                <div className="footer-list">
                                    <ul>
                                        <li><h5>ABOUT US</h5></li>
                                        <li><p>Gallery</p></li>
                                        <li><p>Technologies</p></li>
                                        <li><p>Contacts</p></li>
                                    </ul>
                                </div>

                            </div>
                            <div className="footer-contact">

                                <div className="footer-list">
                                    <ul>
                                        <li><h5>Contact us</h5></li>
                                        <li><p>+91 73569 83827</p></li>
                                        <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=zepx2025@gmail.com" target="_blank" rel="noopener noreferrer"><p>zepx2025@gmail.com</p></a></li>
                                        <li><p>Chhapi, GJ, INDIA</p></li>
                                    </ul>
                                </div>

                            </div>

                            <div className="footer-logo">
                                <img src={require('../../assets/images/logo.png')} alt="logo" />
                            </div>

                        </div>

                        <div className="footer-links">
                            <div className="footer-links-list">
                                <p>Privacy</p>
                                <div className="footer-links-icons">
                                    <ul className='sub-links-icons'>
                                        <li><i class="fa-brands fa-facebook"></i></li>
                                        <li><i class="fa-brands fa-instagram"></i></li>
                                        <li><i class="fa-brands fa-youtube"></i></li>
                                        <li><i class="fa-brands fa-x-twitter"></i></li>
                                    </ul>
                                </div>
                                <p>© 2025 — zepX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer