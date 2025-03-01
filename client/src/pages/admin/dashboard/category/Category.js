import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../../assets/css/admin/category/category.css';

const port = process.env.REACT_APP_URL;


function Category() {

    const [fetchcategory, setfetchcategory] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getcategory();
    }, []);


    const getcategory = async (e) => {
        try {
            const res = await axios.get(`${port}/getcategory`);
            setfetchcategory(res.data)

        } catch (error) {
            console.error(error);

        }

    }



    const deletecategory = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete product")
        if (confirm)
            try {
                await axios.delete(`${port}/deletecategory/${id}`);
                getcategory();
            } catch (error) {
                console.error(error);

            }
    }



    return (
        <div className='main-category-container'>
            <div className='header-category'>
                <div className='header-category-txt'>
                    <p>Categories</p>
                </div>
                <div className='header-category-btns'>
                    <div className='header-category-export'>
                        <button><i class="fa-solid fa-download"></i><p>Export</p></button>
                    </div>
                    <div className='header-category-add'>
                        <NavLink to={'/Admin/add-category'}><button><i class="fa-solid fa-plus"></i><p>Add Category</p></button></NavLink>
                    </div>
                </div>
            </div>


            <div className='category-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='images-td'>images</th>
                            <th>Category Name</th>
                            <th className='category-td'>Category id</th>
                            <th>Created by</th>
                            <th>Updated by</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody Style="text-align:center;">
                        {fetchcategory.map((item) => (

                       
                        <tr>
                            <td className='category-info'>
                                <div id='category-img'>
                                <img src={`/uploads/${item.img}`} alt={item.name}  />
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td className='category-td'>
                                <p>{item.category_id}</p>
                            </td>
                            <td>{item.created_by}</td>
                            <td>{item.updated_by}</td>
                            <td>
                                <div className='action-icons'>
                                    <i className="fa-solid fa-eye"></i>
                                   <NavLink to="/admin/update-category" state={{ id: item.category_id }}>  <i className="fa-solid fa-pen"></i> </NavLink>
                                      <i className="fa-solid fa-trash" onClick={() => deletecategory(item.category_id)}></i>
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

export default Category