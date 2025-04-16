// import React from 'react'
import '../../assets/css/orders.css'
import React, { useEffect, useState } from 'react';
import { Package, Truck, Handshake, FileText } from 'lucide-react';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Orders() {

    const [progress, setProgress] = useState(0); // 0 to 100
    const orderStatus = 80; // Change this to control product status (25, 50, 75, 100)

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < orderStatus) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 35); // Speed of fill
        return () => clearInterval(interval);
    }, []);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 629);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 629);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <Navbar />
            <div className='orders-container'>
                <div className='main-orders'>
                    <div className='header-orders'>
                        <div className='para-header'>
                            <i class="fa-solid fa-arrow-left"></i><p>ORDER DETAILS</p>
                        </div>
                    </div>
                    <div className='horizontal-line'></div>
                    <div className='id-orders'>
                        <div className='sec1-id'>
                            <div className='sub1-sec1'>
                                <p>#96459761</p>
                            </div>
                            <div className='sub2-sec1'>
                                <p>4 Products . Order Placed in 17 Jan, 2021 at 7:32 P</p>
                            </div>
                        </div>
                        <div className='sec2-id'>
                            <p>$1199.00</p>
                        </div>
                    </div>
                    <div className='dilvery-orders'>
                        <div><p>Order expected arrival <b>23 Jan, 2021</b></p></div>
                        <div className="tracking-container">
                            <div className="progress-line-container">
                                <div className="progress-line-background"></div>
                                <div
                                    className="progress-line-fill"
                                    style={isMobile ? { height: `${progress}%` } : { width: `${progress}%` }}
                                ></div>

                                <div className={`dot ${progress >= 0 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 33 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 66 ? 'active' : ''}`}></div>
                                <div className={`dot ${progress >= 100 ? 'active' : ''}`}></div>
                            </div>
                            <div className="status-labels">
                                <div>
                                    <FileText color="green" size={30} />
                                    <p>Order Placed</p>
                                </div>
                                <div>
                                    <Package color="#3c5fff" size={30} />
                                    <p>Packaging</p>
                                </div>
                                <div>
                                    <Truck color="grey" size={30} />
                                    <p>On The Road</p>
                                </div>
                                <div>
                                    <Handshake color="#3c5fff" size={30} />
                                    <p>Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='horizontal-line'></div>
                    <div className='main-details'>
                        <div className='head-details'>
                            <p>Product (02)</p>
                        </div>
                        <div className='prod-details'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='prod-info'>Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sub-Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='prod-info'>
                                            <div className='orders-info'>
                                                <div className='orders-img'>
                                                    <img src={require("../../assets/images/mobile1.png")} />
                                                </div>
                                                <div className='order-i'>
                                                    <p id='order-i-p1'>smartphone</p>
                                                    <p>Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone C..</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$899</td>
                                        <td>x1</td>
                                        <td>$899</td>
                                    </tr>
                                    <tr>
                                        <td className='prod-info'>
                                            <div className='orders-info'>
                                                <div className='orders-img'>
                                                    <img src={require("../../assets/images/mobile1.png")} />
                                                </div>
                                                <div className='order-i'>
                                                    <p id='order-i-p1'>smartphone</p>
                                                    <p>Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone C..</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>$899</td>
                                        <td>x1</td>
                                        <td>$899</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='order-address'>
                            <div className='billing-address'>
                                <p id='order11'>Billing Address</p>
                                <p id='order12'>Kevin Gilbert</p>
                                <p id='order13'>East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh</p>
                                <p id='order14'><span>Phone Number:</span> +1-202-555-0118</p>
                                <p id='order15'><span>Email:</span> kevin.gilbert@gmail.com</p>
                            </div>
                            <div className='verticle-line'></div>
                            <div className='shipping-address'>
                                <p id='order11'>Shopping Address</p>
                                <p id='order12'>Kevin Gilbert</p>
                                <p id='order13'>East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh</p>
                                <p id='order14'><span>Phone Number:</span> +1-202-555-0118</p>
                                <p id='order15'><span>Email:</span> kevin.gilbert@gmail.com</p>
                            </div>
                            <div className='verticle-line'></div>
                            <div className='orders-notes'>
                            <p id='order11'>Order Notes</p>
                            <p id='order13'>Donec ac vehicula turpis. Aenean sagittis est eu arcu ornare, eget venenatis purus lobortis. Aliquam erat volutpat. Aliquam magna odio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Orders
