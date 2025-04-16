import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../../assets/css/admin/product/phone.css';

function Categories() {
    const { id } = useParams()
    const [fetchproducts, setfetchproducts] = useState([]);
    const [category, setCategory] = useState({});


    useEffect(() => {
        getproducts(id);
    }, [id]);


    const getproducts = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getproductsbycategoryid/${id}`);
            setfetchproducts(res.data)

        } catch (error) {
            console.error(error);

        }

    }

    useEffect(() => {
        getcategory();
    }, [id]);

    const getcategory = async () => {
        try {
            const res = await axios.get(`http://localhost:4800/getcategorybyid/${id}`);
            setCategory(res.data[0]); // Set category only if data exists
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };


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
        const confirm = window.confirm("Are you sure you want to delete product")
        if (confirm)
            try {
                await axios.delete(`http://localhost:4800/deleteproducts/${id}`);
                getproducts();
            } catch (error) {
                console.error(error);

            }
    }

    const truncateString = (str, maxLength) => {
        return str && str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };



    return (
        <div className='main-product-container'>
            <div className='header-product'>
                <div className='header-product-txt'>
                    <p>Products<span><i class="fa-solid fa-caret-right"></i> <b>{category.name}</b></span></p>
                </div>
                <div className='header-product-btns'>
                    <div className='header-product-export'>
                        <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                    </div>
                    <div className='header-product-add'>
                        <NavLink to={'/admin/Add-Product'}><button><i class="fa-solid fa-plus"></i><p>Add Product</p></button></NavLink>
                    </div>
                </div>
            </div>


            <div className='product-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='images-td'>images</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Tax</th>
                            <th>Status</th>
                            <th>created_by</th>
                            <th>updated_by</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchproducts.map((item) => (
                            <tr key={item.id}>
                                <td className='product-info'>
                                    <div id='product-img'>
                                        {JSON.parse(item.img || "[]")[0] && (
                                            <img src={`/uploads/${JSON.parse(item.img || "[]")[0]}`} alt="product" width="100px" />
                                        )}
                                    </div>
                                </td>
                                <td>{truncateString(item.title, 10)}</td>
                                <td>{item.price}</td>
                                <td>{item.discount}</td>
                                <td>{item.tax}</td>
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
                                <td>
                                    <div className='action-icons'>
                                    <NavLink to="/admin/Veiw-Product" state={{ id: item.product_id }}>
                                            <i className="fa-solid fa-eye"></i>
                                        </NavLink>
                                        <NavLink to="/admin/Update-Product" state={{ id: item.product_id }}>
                                            <i className="fa-solid fa-pen"></i>
                                        </NavLink>
                                        <i className="fa-solid fa-trash" onClick={() => deleteproducts(item.product_id)}></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Categories;
















































