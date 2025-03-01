import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../../assets/css/admin/customer-manage/customer.css';
import DeleteModal from '../../../../components/DeleteModel';


function Customer() {

    const [fetchuser, setfetchuser] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [selectuser, setselectuser] = useState(null);

    const port = process.env.REACT_APP_URL;

    useEffect(() => {
        getuser();
    }, []);

    const getuser = async () => {
        try {
            const res = await axios.get(`${port}/users`);
            setfetchuser(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            
            // Optimistically update UI before sending request
            setfetchuser((prevUsers) =>
                prevUsers.map((user) =>
                    user.user_id === id ? { ...user, status: newStatus } : user
                )
            );
    
            await axios.put(`${port}/userstatus/${id}`, { status: newStatus });
            getuser();
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update user status. Please try again.");
        }
    };


    const deleteuser = async () => {
        try {
            await axios.delete(`${port}/deleteuser/${selectuser}`);
            setselectuser(null);
            setmodalOpen(false)
            getuser();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        setselectuser(id);
        setmodalOpen(true);
    };


    return (
        <>
            <div className='main-Admin-container'>
                <div className='header-Admin'>
                    <div className='header-Admin-txt'>
                        <p>Coustomers</p>
                    </div>
                    <div className='header-customer-btns'>
                        <div className='header-Admin-export'>
                            <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                        </div>
                        <div className='header-Admin-add'>
                            <button><i class="fa-solid fa-plus"></i><p>Add Coustomers</p></button>
                        </div>
                    </div>
                </div>
                <div className='Admin-table'>
                    <table>
                        <thead>
                            <tr>
                                <th className='Admin-name-th'>Name</th>
                                <th className='Admin-email-th'>Email</th>
                                <th>Phone No</th>
                                <th>Address</th>
                                <th>Added</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchuser.length > 0 ? (
                                fetchuser.map((item) => (
                                    <tr key={item.admin_id}>
                                        <td className='Admin-info'>
                                            <div className='Admin-flexx'>
                                                <div id='Admin-img'>
                                                    <img src={`/uploads/${item.img}`} alt={item.username} />

                                                    {/* <img src={require('../../../../assets/images/admin/alkama.jpg')} alt="iPhone 11 Pro" /> */}
                                                </div>
                                                <div className='Admin-txt'><p>{item.username}</p></div>
                                            </div>
                                        </td>
                                        <td className='Admin-email-td'>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.address}</td>
                                        <td>24 Jun 2023</td>
                                        <td>
                                        <span>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.status === "active"}
                                                        onChange={() => updateUserStatus(item.user_id, item.status)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </td>
                                        <td>
                                            <div className='action-icons'>
                                                <i className="fa-solid fa-eye"></i>
                                                <i className="fa-solid fa-trash" onClick={() => handleDelete(item.user_id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No admins found</td>
                                </tr>
                            )}
                        </tbody >
                    </table >
                </div >
            </div >
            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setmodalOpen(false)}
                onConfirm={deleteuser}
                fieldName={"admin"}
            />
        </>
    );
}

export default Customer;