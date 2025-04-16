import React from 'react';
import { NavLink } from "react-router-dom";
import "../../assets/css/order-history.css";

function OrderHistory() {
  return (
    <>
      <div className='content-order'>
        <div className="sub1-order">
          <p>Order History</p>
        </div>
        <div className='history-table'>
          <table>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th className='status'>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, index) => (
                <tr key={index}>
                  <td data-label="Product">
                    <p>iPhone 11 Pro</p>
                  </td>
                  <td data-label="Status" className='status'><p>DELIVERED</p></td>
                  <td data-label="Date"><p>MAR 24, 2023 07:26</p></td>
                  <td data-label="Total"><p>₹59,000 (5 items)</p></td>
                  <td data-label="Action" className='action'>
                  <NavLink to={"/Orders"}> <b><p> View Details</p> <i className="fa-solid fa-arrow-right"></i></b></NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderHistory;
