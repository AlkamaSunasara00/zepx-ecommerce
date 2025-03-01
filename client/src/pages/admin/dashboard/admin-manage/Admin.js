import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../../assets/css/admin/admin-manage/admin.css';
import DeleteModal from '../../../../components/DeleteModel';
import { NavLink } from 'react-router-dom';

function Admin() {
    const [admins, setAdmins] = useState([]);
    const [fetchadmin, setfetchadmin] = useState([]);
    const [modalOpen,setmodalOpen]=useState(false);
    const [selectadmin,setselectadmin]=useState(null);

    const port = process.env.REACT_APP_URL;
    const navigate = useNavigate();

    useEffect(() => {
        getadmin();
    }, []);

    const getadmin = async (e) => {
        try {
            const res = await axios.get(`${port}/admins`);
            setfetchadmin(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            
            // Optimistically update UI before sending request
            setfetchadmin((prevAdmins) =>
                prevAdmins.map((admin) =>
                    admin.admin_id === id ? { ...admin, status: newStatus } : admin
                )
            );
    
            await axios.put(`${port}/updateadminstatus/${id}`, { status: newStatus });
    
            // Optional: Fetch fresh data from the server
            getadmin();
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update admin status. Please try again.");
        }
    };
    
    const deleteadmin = async () => {
        try {
            await axios.delete(`${port}/deleteadmin/${selectadmin}`);
            setselectadmin(null);
            setmodalOpen(false)
            getadmin();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        setselectadmin(id);
        setmodalOpen(true);
    };

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    return (
        <>
            <div className='main-Admin-container'>
                <div className='header-Admin'>
                    <div className='header-Admin-txt'>
                        <p>Admins</p>
                    </div>
                    <div className='header-Admin-btns'>
                        <div className='header-Admin-export'>
                            <button><i className="fa-solid fa-download"></i><p>Export</p></button>
                        </div>
                        <div className='header-Admin-add'>
                            <NavLink to={'/admin/add-admin'}><button><i className="fa-solid fa-plus"></i><p>Add Admin</p></button></NavLink>
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
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchadmin.length > 0 ? (
                                fetchadmin.map((item) => (
                                    <tr key={item.admin_id}>
                                        <td className='Admin-info'>
                                            <div className='Admin-flexx'>
                                                <div id='Admin-img'>
                                                    <img src={`/uploads/${item.img}`} alt={item.username} />
                                                </div>
                                                <div className='Admin-txt'><p>{item.username}</p></div>
                                            </div>
                                        </td>
                                        <td className='Admin-email-td'>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.address}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <span>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.status === "active"}
                                                        onChange={() => updateStatus(item.admin_id, item.status)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </td>
                                        <td>
                                            <div className='action-icons'>
                                                <NavLink to={'/admin/update-admin'}><i className="fa-solid fa-eye"></i></NavLink>
                                                <NavLink to="/admin/update-admin" state={{ id: item.admin_id }}>    <i className="fa-solid fa-pen"></i></NavLink>
                                                <i className="fa-solid fa-trash" onClick={() => handleDelete(item.admin_id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No admins found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteModal 
                isOpen={modalOpen}
                onClose={() => setmodalOpen(false)}
                onConfirm={deleteadmin}
                fieldName={"admin"}
            />
        </>
    );
}

export default Admin;




















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../../../../assets/css/admin/admin-manage/admin.css';
// import DeleteModal from '../../../../components/DeleteModel';

// import { NavLink } from 'react-router-dom';

// function Admin() {
//     const [admins, setAdmins] = useState([]);
//     const [fetchadmin, setfetchadmin] = useState([]);
//     const [modalOpen,setmodalOpen]=useState(false);
//     const [selectadmin,setselectadmin]=useState(null);


//     const port = process.env.REACT_APP_URL;

//     const navigate = useNavigate();

//     useEffect(() => {
//         getadmin();
//     }, []);


//     const getadmin = async (e) => {
//         try {
//             const res = await axios.get(`${port}/admins`);
//             setfetchadmin(res.data)

//         } catch (error) {
//             console.error(error);

//         }

//     };


//     const updateStatus = async (id, currentStatus) => {
//         try {
//             const newStatus = currentStatus === "active" ? "inactive" : "active";
//             await axios.put(`${port}/updateadminstatus/${id}`, { status: newStatus });
//             getadmin(); // Refresh product list
//         } catch (error) {
//             console.error("Error updating status", error);
//         }
//     };

//     const deleteadmin = async () => {
       
//         try {
//             await axios.delete(`${port}/deleteadmin/${selectadmin}`);
//             setselectadmin(null);
//             setmodalOpen(false)
//             admins();
//         } catch (error) {
//             console.error(error);

//         }
// };
// const handleDelete=(id)=>{
//     setselectadmin(id);
//     setmodalOpen(true);
// }

// const truncateString = (str, maxLength) => {
//     return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
// };

    
    

//     return (
//         <>
//         <div className='main-Admin-container'>
//             <div className='header-Admin'>
//                 <div className='header-Admin-txt'>
//                     <p>Admins</p>
//                 </div>
//                 <div className='header-Admin-btns'>
//                     <div className='header-Admin-export'>
//                         <button><i className="fa-solid fa-download"></i><p>Export</p></button>
//                     </div>
//                     <div className='header-Admin-add'>
//                         <NavLink to={"/admin/add-admin"}><button><i className="fa-solid fa-plus"></i><p>Add Admin</p></button></NavLink>
//                     </div>
//                 </div>
//             </div>
//             <div className='Admin-table'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th className='Admin-name-th'>Name</th>
//                             <th className='Admin-email-th'>Email</th>
//                             <th>Phone No</th>
//                             <th>Address</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                    
//                     {fetchadmin.map((item) => (
//                                 <tr>
//                                     <td className='Admin-info'>
//                                         <div className='Admin-flexx'>
//                                             <div id='Admin-img'>
//                                             <img src={`/uploads/${item.img}`} alt={item.username} />
//                                             </div>
//                                             <div className='Admin-txt'><p>{item.username}</p></div>
//                                         </div>
//                                     </td>
//                                     <td className='Admin-email-td'>{item.email}</td>
//                                     <td>{item.contact}</td>
//                                     <td>{item.address}</td>
//                                     <td>{item.role}</td>
//                                     <td>
//                                     <span >
//                                         <label class="switch">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={item.status === "active"}
//                                                 onChange={() => updateStatus(item.admin_id, item.status)}
//                                             />
//                                             <span class="slider round"></span>
//                                         </label>
//                                     </span>
//                                     </td>
//                                     <td>
//                                         <div className='action-icons'>
//                                             <i className="fa-solid fa-eye"></i>
//                                             <NavLink to="/admin/updateadmin" state={{ id: item.admin_id }}>    <i className="fa-solid fa-pen"></i></NavLink>
//                                             <i className="fa-solid fa-trash" onClick={() => handleDelete(item.admin_id)}></i>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//            <DeleteModal 
//            isOpen={modalOpen}
//            onClose={()=>setmodalOpen(false)}
//            onConfirm={deleteadmin}
//            fieldName={"admin"}
//            />
//            </>
//        );
    
// }

// export default Admin;




































// import '../../../../assets/css/admin/admin-manage/admin.css';

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom';
// import DeleteModal from '../../../../components/DeleteModel';

// const port = process.env.REACT_APP_URL;

// function Admin() {
    // const [fetchadmin, setfetchadmin] = useState([]);
    // const [modalOpen,setmodalOpen]=useState(false);
    // const [selectadmin,setselectadmin]=useState(null);


    // const navigate = useNavigate();

    // useEffect(() => {
    //     getadmin();
    // }, []);


    // const getadmin = async (e) => {
    //     try {
    //         const res = await axios.get(`${port}/admins`);
    //         setfetchadmin(res.data)

    //     } catch (error) {
    //         console.error(error);

    //     }

    // };


    // const updateStatus = async (id, currentStatus) => {
    //     try {
    //         const newStatus = currentStatus === "active" ? "inactive" : "active";
    //         await axios.put(`${port}/updateadminstatus/${id}`, { status: newStatus });
    //         getadmin(); // Refresh product list
    //     } catch (error) {
    //         console.error("Error updating status", error);
    //     }
    // };



    // const deleteadmin = async () => {
       
    //         try {
    //             await axios.delete(`${port}/deleteadmin/${selectadmin}`);
    //             setselectadmin(null);
    //             setmodalOpen(false)
    //             getadmin();
    //         } catch (error) {
    //             console.error(error);

    //         }
    // };
    // const handleDelete=(id)=>{
    //     setselectadmin(id);
    //     setmodalOpen(true);
    // }

    // const truncateString = (str, maxLength) => {
    //     return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    // };

//     return (
//         <>
//         <div className='main-Admin-container'>
//             <div className='header-Admin'>
//                 <div className='header-Admin-txt'>
//                     <p>Admins</p>
//                 </div>
//                 <div className='header-Admin-btns'>
//                     <div className='header-Admin-export'>
//                         <button><i class="fa-solid fa-download"></i><p>Export</p></button>
//                     </div>
//                     <div className='header-Admin-add'>
//                         <NavLink to={'/admin/addadmin'}>  <button><i class="fa-solid fa-plus"></i><p>Add Admin</p></button></NavLink>
//                     </div>
//                 </div>
//             </div>
//             <div className='Admin-table'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th className='Admin-name-th'>UserName</th>
//                             <th className='Admin-email-th'>Email</th>
//                             <th>Phone No</th>
//                             <th>Address</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {fetchadmin.map((item) => (


//                             <tr>
//                                 <td className='Admin-info'>
//                                     <div className='Admin-flexx'>
//                                         <div id='Admin-img'>
//                                             <img src={`/uploads/${item.img}`} alt={item.username} />
//                                             {/* <img src="https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces" alt={item.username} /> */}

//                                         </div>
//                                         <div className='Admin-txt'><p>{truncateString(item.username, 10)}</p></div>
//                                         {/* <td>{truncateString(item.title, 10)}</td> */}
//                                     </div>
//                                 </td>
//                                 <td className='Admin-email-td'>{item.email}</td>
//                                 <td>{item.contact}</td>
//                                 <td>{item.address}</td>
//                                 <td>{item.role}</td>
//                                 <td>
                                    // <span >
                                    //     <label class="switch">
                                    //         <input
                                    //             type="checkbox"
                                    //             checked={item.status === "active"}
                                    //             onChange={() => updateStatus(item.admin_id, item.status)}
                                    //         />
                                    //         <span class="slider round"></span>
                                    //     </label>
                                    // </span>
//                                 </td>
//                                 <td>
//                                     <div className='action-icons'>
//                                         <i className="fa-solid fa-eye"></i>
                                        // <NavLink to="/admin/updateadmin" state={{ id: item.admin_id }}>    <i className="fa-solid fa-pen"></i></NavLink>
                                        // <i className="fa-solid fa-trash" onClick={() => handleDelete(item.admin_id)}></i>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody >
//                 </table >
//             </div >
//         </div >
    //     <DeleteModal 
    //     isOpen={modalOpen}
    //     onClose={()=>setmodalOpen(false)}
    //     onConfirm={deleteadmin}
    //     fieldName={"admin"}
    //     />
    //     </>
    // );
// }

// export default Admin;
