
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModel';

import "./abc.css"

const Prod = () => {
    const [fetchproducts, setfetchproducts] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
        const [selectproduct, setselectproduct] = useState(null);


    const port = process.env.REACT_APP_URL;


    // const navigate = useNavigate();

    useEffect(() => {
        getproducts();
    }, []);


    const getproducts = async (e) => {
        try {
            const res = await axios.get("http://localhost:4800/getproducts");
            setfetchproducts(res.data)
            console.log(res.data)

        } catch (error) {
            console.error(error);

        }

    }



    const updateStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "1" ? "0" : "1";
            await axios.put(`http://localhost:4800/updateproductstatus/${id}`, { status: newStatus });
            getproducts(); // Refresh product list
        } catch (error) {
            console.error("Error updating status", error);
        }
    };




    const deleteproducts = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete category")
        if (confirm)
            try {
                await axios.delete(`http://localhost:4800/deleteproducts/${id}`);
                getproducts();
            } catch (error) {
                console.error(error);

            }
    }

    // const deleteproducts = async (id) => {
    //     try {
    //         await axios.delete(`${port}/deleteproducts/${id}`);
    //         getproducts();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleDelete = (id) => {
    //     setselectproduct(id);
    //     setmodalOpen(true);
    // };

    return (
        <>
        <div>
            <div className="add-btn">
                <NavLink to={"/AddProducts"}>
                    <button>+ Add</button>
                </NavLink>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>price</th>
                        <th>discount</th>
                        <th>tax</th>
                        <th>memory</th>
                        <th>size</th>
                        <th>storage</th>
                        <th>img</th>
                        <th>status</th>
                        <th>created_by</th>
                        <th>updated_by</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>

                <tbody>
                    {fetchproducts.map((item) => (


                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.discount}</td>
                            <td>{item.tax}</td>
                            <td>{item.memory}</td>
                            <td>{item.size}</td>
                            <td>{item.storage}</td>
                            <td>
                                {JSON.parse(item.img || "[]").map((image, index) => (
                                    <img key={index} src={`../uploads/${image}`} alt={`product-${index}`} width="100px" />
                                ))}
                            </td>
                            <td>
                                <label class="switch">
                                    <input
                                        type="checkbox"
                                        checked={item.status === "1"}
                                        onChange={() => updateStatus(item.product_id, item.status)}
                                    />
                                    <span class="slider round"></span>
                                </label>

                            </td>

                            <td>{item.created_by}</td>
                            <td>{item.updated_by}</td>
                            <td className="action">
                                <NavLink to="/UpdateProducts" state={{ id: item.product_id }}><button>
                                    EDIT
                                </button></NavLink></td>
                                <i className="fa-solid fa-trash" onClick={() => deleteproducts(item.product_id)}></i>
                            {/* <td><button onClick={() => deleteproducts(item.product_id)}>delete</button></td> */}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
        {/* <DeleteModal
        isOpen={modalOpen}
        onClose={() => setmodalOpen(false)}
        onConfirm={deleteproducts}
        fieldName={"products"}
    /> */}
</>
    )
}

export default Prod