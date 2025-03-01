import React from 'react';
import '../../../../assets/css/admin/order/order.css';

function Order() {
    return (
        <div className='main-order-container'>
            <div className='header-order'>
                <div className='header-order-txt'>
                    <p>Orders</p>
                </div>
                <div className='header-order-btns'>
                    <div className='header-order-export'>
                        <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                    </div>
                    <div className='header-order-add'>
                        <button><i class="fa-solid fa-plus"></i><p>Add Order</p></button>
                    </div>
                </div>
            </div>
            <div className='order-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='order-id'>Order ID</th>
                            <th className='order-prod'>Product</th>
                            <th>Date</th>
                            <th>Coustomer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='order-id'>1001</td>
                            <td className='order-info'>
                                <div className='order-flexx'>
                                    <div id='product-img'>
                                        <img src={require('../../../../assets/images/admin/alkama.jpg')} alt="iPhone 11 Pro" />
                                    </div>
                                    <div className='order-txt'><p>iPhone 11 Pro</p></div>
                                </div>
                            </td>
                            <td>24 Jun 2023</td>
                            <td>Alkama</td>
                            <td>₹59000</td>
                            <td>Delivered</td>
                            <td>
                                <span >
                                    Active
                                </span>
                            </td>
                            <td>
                                <div className='action-icons'>
                                    <i className="fa-solid fa-eye"></i>
                                    <i className="fa-solid fa-pen"></i>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody >
                </table >
            </div >
        </div >
    );
}

export default Order;