import React from 'react';
import '../../../../assets/css/admin/coupon/coupon.css';

function Coupon() {
    return (
        <div className='main-coupon-container'>
            <div className='header-coupon'>
                <div className='header-coupon-txt'>
                    <p>Coupon</p>
                </div>
                <div className='header-coupon-btns'>
                    <div className='header-coupon-add'>
                        <button><i class="fa-solid fa-plus"></i><p>Create Coupon</p></button>
                    </div>
                </div>
            </div>
            <div className='coupon-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='coupon-code1'>Coupon Code</th>
                            <th>Discount</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Start</th>
                            <th>Expiry</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='coupon-code'>SOMERANDOMCODEHERE</td>
                            <td className='coupon-discount'>15%</td>
                            <td className='max-min'>2000</td>
                            <td className='max-min'>3000</td>
                            <td className='coupon-date'>07 Feb 2025</td>
                            <td className='coupon-date'>26 Feb 2025</td>
                            <td className='coupon-status'>
                                <span >
                                    Active
                                </span>
                            </td>
                            <td className='coupon-date'>01 Feb 2025</td>
                            <td className='coupon-action'>
                                <div className='action-icons'>
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

export default Coupon;