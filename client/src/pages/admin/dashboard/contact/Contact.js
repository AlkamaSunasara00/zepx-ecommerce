import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../../assets/css/admin/contact/contact.css';
import DeleteModal from '../../../../components/DeleteModel';


function Contact() {

    const [fetchcontact, setfetchcontact] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [selectcontact, setselectcontact] = useState(null);

    const port = process.env.REACT_APP_URL;


    useEffect(() => {
        getcontact();
    }, []);

    const getcontact = async () => {
        try {
            const res = await axios.get(`${port}/getcontact`);
            setfetchcontact(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    const deletecontact = async () => {
        try {
            await axios.delete(`${port}/deletecontact/${selectcontact}`);
            setselectcontact(null);
            setmodalOpen(false)
            getcontact();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        setselectcontact(id);
        setmodalOpen(true);
    };


    return (
        <>
            <div className='main-contact-container'>
                <div className='header-contact'>
                    <div className='header-contact-txt'>
                        <p>Contact</p>
                    </div>
                </div>
                <div className='contact-table'>
                    <table>
                        <thead>
                            <tr>
                                <th  className='contact-name-td'>FirsName</th>
                                <th  className='contact-name-td'>LastName</th>
                                <th  className='contact-email-td'>Email</th>
                                <th  className='contact-name-td'>Phone No</th>
                                <th  className='contact-name-td'>Message</th>
                                <th  className='contact-name-td'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchcontact.length > 0 ? (
                                fetchcontact.map((item) => (
                                    <tr key={item.contact_id}>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td className='contact-email-td'>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.message}</td>
                                        <td>
                                            <div className='action-icons'>
                                                <i className="fa-solid fa-trash" onClick={() => handleDelete(item.contact_id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No contact found</td>
                                </tr>
                            )}
                        </tbody >
                    </table >
                </div >
            </div >
            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setmodalOpen(false)}
                onConfirm={deletecontact}
                fieldName={"contact"}
            />
        </>
    );
}

export default Contact;