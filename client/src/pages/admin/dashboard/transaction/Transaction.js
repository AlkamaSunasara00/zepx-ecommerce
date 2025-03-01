import React from 'react';
import '../../../../assets/css/admin/transaction/transaction.css';

function Transaction() {
    return (
        <div className='main-transaction-container'>
            <div className='header-transaction'>
                <div className='header-transaction-txt'>
                    <p>Transaction</p>
                </div>
                <div className='header-transaction-btns'>
                    <div className='header-transaction-export'>
                        <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                    </div>
                    <div className='header-transaction-add'>
                        <button><i class="fa-solid fa-plus"></i><p>New Transaction</p></button>
                    </div>
                </div>
            </div>
            <div className='transaction-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='transaction-name-th'>User Name</th>
                            <th className='transaction-description-th'>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='transaction-info'>
                                <div className='transaction-flexx'>
                                    <div id='transaction-img'>
                                        <img src={require('../../../../assets/images/admin/alkama.jpg')} alt="iPhone 11 Pro" />
                                    </div>
                                    <div className='description-txt'><p>Alkama</p></div>
                                </div>
                            </td>
                            <td className='transaction-description-td'>nothinggggg</td>
                            <td>2000</td>
                            <td>credit</td>
                            <td>24 Jun 2023</td>
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

export default Transaction;