// update product

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const UpdateProducts = () => {
  const [editproducts, seteditproducts] = useState({
    title: "",
    price: "",
    discount: "",
    tax: "",
    memory: "",
    size: "",
    storage: "",
    img: null,
    description: "",
    status: "",
    created_by: "",
    updated_by: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchproductsbyid(location.state.id);
  }, [location.state.id]);
  console.log(location.state.id)


  const fetchproductsbyid = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4800/getproductbyid/${id}`)
      seteditproducts(res.data[0])
    }

    catch (error) {
      console.error(error);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    seteditproducts((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    seteditproducts((prev) => ({
      ...prev,
      img: files,  // Directly assign multiple files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      //   formdata.append("category_id", editproducts.category_id);
      formdata.append("title", editproducts.title);
      formdata.append("price", editproducts.price);
      formdata.append("discount", editproducts.discount);
      formdata.append("tax", editproducts.tax);
      formdata.append("memory", editproducts.memory);
      formdata.append("size", editproducts.size);
      formdata.append("storage", editproducts.storage);

      // Append multiple images
      for (let i = 0; i < editproducts.img.length; i++) {
        formdata.append("img", editproducts.img[i]);
      }

      formdata.append("description", editproducts.description);
      formdata.append("status", editproducts.status);
      formdata.append("created_by", editproducts.created_by);
      formdata.append("updated_by", editproducts.updated_by);

      await axios.patch(`http://localhost:4800/updateproduct/${location.state.id}`, formdata);

      seteditproducts({
        title: "",
        price: "",
        discount: "",
        tax: "",
        memory: "",
        size: "",
        storage: "",
        img: null,
        description: "",
        status: "",
        created_by: "",
        updated_by: "",
      });

      navigate("/prod");
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label>title</label>
        <input type='text' placeholder='title' name='title' value={editproducts.title} onChange={handleChange}></input>
        <input type='text' placeholder='price' name='price' value={editproducts.price} onChange={handleChange}></input>
        <input type='text' placeholder='discount' name='discount' value={editproducts.discount} onChange={handleChange}></input>
        <input type='text' placeholder='tax' name='tax' value={editproducts.tax} onChange={handleChange}></input>
        <input type='text' placeholder='memory' name='memory' value={editproducts.memory} onChange={handleChange}></input>
        <input type='text' placeholder='size' name='size' value={editproducts.size} onChange={handleChange}></input>
        <input type='text' placeholder='storage' name='storage' value={editproducts.storage} onChange={handleChange}></input>
        <input type='file' placeholder='image' name='img' onChange={handleFileChange} multiple></input>
        <input type='text' placeholder='description' name='description' value={editproducts.description} onChange={handleChange}></input>
        {/* <input type='text' placeholder='status' name='status' value={editproducts.status} onChange={handleChange}></input> */}
        <label>Status</label>
        <select name="status" value={editproducts.status} onChange={handleChange}>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <input type='text' placeholder='created_by' name='created_by' value={editproducts.created_by} onChange={handleChange} readOnly></input>
        <input type='text' placeholder='updated_by' name='updated_by' value={editproducts.updated_by} onChange={handleChange}></input>

        <button type='submit'>add products</button>
      </form>
    </div>
  )
}

export default UpdateProducts