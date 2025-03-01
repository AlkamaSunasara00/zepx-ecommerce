import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../../assets/css/admin/feedback/feedback.css';
import DeleteModal from '../../../../components/DeleteModel';


function Feedback() {

    const [fetchfeedback, setfetchfeedback] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [selectfeedback, setselectfeedback] = useState(null);

    const port = process.env.REACT_APP_URL;


    useEffect(() => {
        getfeedback();
    }, []);

    const getfeedback = async () => {
        try {
            const res = await axios.get(`${port}/getfeedback`);
            setfetchfeedback(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    const deletefeedback = async () => {
        try {
            await axios.delete(`${port}/deletefeedback/${selectfeedback}`);
            setselectfeedback(null);
            setmodalOpen(false)
            getfeedback();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        setselectfeedback(id);
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
                                <th  className='contact-nameee-td'>username</th>
                                <th  className='contact-feed-td'>feedback</th>
                                <th  className='contact-namee-td'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchfeedback.length > 0 ? (
                                fetchfeedback.map((item) => (
                                    <tr key={item.user_id}>
                                        <td id='contact-nameee-td'>{item.username}</td>
                                        <td id='contact-feed-td'>{item.feedback}</td>
                                        <td id='contact-namee-td'>
                                            <div className='action-icons'>
                                                <i className="fa-solid fa-trash" onClick={() => handleDelete(item.feedback_id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No feedbacks found</td>
                                </tr>
                            )}
                        </tbody >
                    </table >
                </div >
            </div >
            <DeleteModal
                isOpen={modalOpen}
                onClose={() => setmodalOpen(false)}
                onConfirm={deletefeedback}
                fieldName={"feedback"}
            />
        </>
    );
}

export default Feedback;