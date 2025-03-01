import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../../assets/css/admin/product/addcategory.css';
import { useRef } from "react";
import { NavLink } from 'react-router-dom';

const port=process.env.REACT_APP_URL;


const UpdateCategory = () => {
    const [editcategory, seteditcategory] = useState({
        name: "",
        img: null,
        created_by: "",
        updated_by: ""
    });
    const location = useLocation();
    const navigate = useNavigate();


    const fetchcategorybyid = async (id) => {
        try {
            const res = await axios.get(`${port}/getcategorybyid/${id}`)

            seteditcategory(res.data[0])
        }

        catch (error) {
            console.error(error);

        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target
        seteditcategory((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        seteditcategory((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    };

 const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append("name", editcategory.name);
            formdata.append("img", editcategory.img);
            formdata.append("created_by", editcategory.created_by);
            formdata.append("updated_by", editcategory.updated_by);



            await axios.put(`${port}/updatecategory/${location.state.id}`, formdata,


            )
            seteditcategory({
                name: "",
                img: null,
                created_by: "",
                updated_by: ""
            })
            navigate("/admin/category")
        } catch (error) {
            console.error(error);

        }
    }




    useEffect(() => {
        fetchcategorybyid(location.state.id);
    }, [location.state.id]);

  return (
    <div>
       <div className='main-addcategory-container'>
                  <div className='header-addcategory'>
                      <div className='header-addcategory-txt'>
                          <p>Update Category</p>
                      </div>
                      <div className='header-addcategory-btns'>
                          <div className='header-addcategory-cancel'>
                              <NavLink to={'/admin/category'}><button><i class="fa-solid fa-xmark"></i><p>cancel</p></button></NavLink>
                          </div>
                          <form onSubmit={handleSubmit}>
                              <div className='header-addcategory-add'>
                                  <button type='submit' ><p>Update category</p></button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div className='addcategory-container'>
                      <form onSubmit={handleSubmit}>
                          <div className='sub-addcategory-container'>
                              <div className='sub1-addcategory-container'>
                                  <p>Thumbnail</p>
                                  <div className='item1-addcategory-para' ><p>Photo</p></div>
      
                                  <div className='addcategory-input-photo' onClick={handleButtonClick}>
                                      <div className='addcategory-input-photo-icon'>
                                          <i class="fa-regular fa-image"></i>
                                      </div>
                                      <div className='addcategory-input-photo-txt'>
                                          <p>click here to add image</p>
                                      </div>
                                      <label id="upload">
                                          <button type='button' >Update Image</button>
                                      </label>
                                      <input type="file" name="img" ref={fileInputRef} id="upload" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                                  </div>
                              </div>
                              <div className='sub2-addcategory-container'>
                                  <p>General Information</p>
                                  <div className='sub2-addcategory-input-name'>
                                      <div>
                                          <label>Category Name</label>
                                      </div>
                                      <input type='text' placeholder='Type category name here. . .' name='name' value={editcategory.name} onChange={handleChange} />
                                  </div>
      
                                  <div className='sub2-addcategory-input-description'>
                                      <div className='addcategory-input-create'>
                                          <div>
                                              <label>Created_By</label>
                                          </div>
                                          <input type='text' name='created_by' value={editcategory.created_by} onChange={handleChange} />
                                      </div>
                                      <div className='addcategory-input-create'>
                                          <div>
                                              <label>Updated_By</label>
                                          </div>
                                          <input type='text' name='updated_by' value={editcategory.updated_by} onChange={handleChange} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
    </div>
  )
}

export default UpdateCategory