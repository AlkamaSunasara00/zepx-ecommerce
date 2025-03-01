import React from 'react';
import '../../../../assets/css/admin/product/tv.css';
import { NavLink } from 'react-router-dom';

function Telivision() {
    return (
        <div className='main-product-container'>
            <div className='header-product'>
                <div className='header-product-txt'>
                    <p>Products <span><i class="fa-solid fa-caret-right"></i> <b>telivision</b></span></p>
                </div>
                <div className='header-product-btns'>
                    <div className='header-product-export'>
                        <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                    </div>
                    <div className='header-product-add'>
                    <NavLink to={'/Admin/add-product'}><button><i class="fa-solid fa-plus"></i><p>Add Product</p></button></NavLink>
                    </div>
                </div>
            </div>


            <div className='product-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='images-td'>images</th>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='product-info'>
                                <div id='product-img'>
                                <img src={require('../../../../assets/images/admin/hammad.jpg')} alt="iPhone 11 Pro" />
                                </div>
                            </td>
                            <td>
                            <p>iPhone 11 Pro</p>
                            </td>
                            <td className='sku'>302012</td>
                            <td>iPhone</td>
                            <td>10</td>
                            <td>₹59000</td>
                            <td>
                                <span >
                                    Active
                                </span>
                            </td>
                            <td>24 Jun 2023</td>
                            <td>
                                <div className='action-icons'>
                                <i className="fa-solid fa-eye"></i>
                                <i className="fa-solid fa-pen"></i>
                                <i className="fa-solid fa-trash"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Telivision;
