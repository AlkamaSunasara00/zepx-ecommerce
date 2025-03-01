// add product

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const [categories, setCategories] = useState([]);
    const [fetchproducts, setfetchproducts] = useState([]);
    const [addproducts, setaddproducts] = useState({
        category_id: "",
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
        updated_by: ""


    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:4800/getcategory");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const navigate = useNavigate();

    useEffect(() => {
        getproducts();
    }, [navigate]);


    const getproducts = async (e) => {
        try {
            const res = await axios.get("http://localhost:4800/getproducts");
            setfetchproducts(res.data)

        } catch (error) {
            console.error(error);

        }

    };



    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const formdata = new FormData();
          formdata.append("category_id", addproducts.category_id);
          formdata.append("title", addproducts.title);
          formdata.append("price", addproducts.price);
          formdata.append("discount", addproducts.discount);
          formdata.append("tax", addproducts.tax);
          formdata.append("memory", addproducts.memory);
          formdata.append("size", addproducts.size);
          formdata.append("storage", addproducts.storage);
      
          // Append multiple images
          for (let i = 0; i < addproducts.img.length; i++) {
            formdata.append("img", addproducts.img[i]);
          }
      
          formdata.append("description", addproducts.description);
          formdata.append("status", addproducts.status);
          formdata.append("created_by", addproducts.created_by);
          formdata.append("updated_by", addproducts.updated_by);
      
          await axios.post("http://localhost:4800/addproducts", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      
          setaddproducts({
            category_id: "",
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
      
          getproducts();
          navigate("/Prod");
        } catch (error) {
          console.log(error);
        }
      };
      



    const handleChange = (e) => {
        const { name, value } = e.target
        setaddproducts((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // const handleFileChange = (e) => {
    //     const { name, files } = e.target;
    //     setaddproducts((prev) => ({
    //         ...prev,
    //         [name]: files[0]
    //     }))
    // }


    const handleFileChange = (e) => {
        const files = e.target.files;
        setaddproducts((prev) => ({
          ...prev,
          img: files,  // Directly assign multiple files
        }));
      };
      


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>name</label>
                <select type='text' placeholder='category_id' name='category_id' value={addproducts.category_id} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input type='text' placeholder='title' name='title' value={addproducts.title} onChange={handleChange}></input>
                <input type='text' placeholder='price' name='price' value={addproducts.price} onChange={handleChange}></input>
                <input type='text' placeholder='discount' name='discount' value={addproducts.discount} onChange={handleChange}></input>
                <input type='text' placeholder='tax' name='tax' value={addproducts.tax} onChange={handleChange}></input>
                <input type='text' placeholder='memory' name='memory' value={addproducts.memory} onChange={handleChange}></input>
                <input type='text' placeholder='size' name='size' value={addproducts.size} onChange={handleChange}></input>
                <input type='text' placeholder='storage' name='storage' value={addproducts.storage} onChange={handleChange}></input>
                <input type='file' placeholder='image' name='img' onChange={handleFileChange} multiple></input>
                <input type='text' placeholder='description' name='description' value={addproducts.description} onChange={handleChange}></input>
                <input type='text' placeholder='status' name='status' value={addproducts.status} onChange={handleChange}></input>
                <input type='text' placeholder='created_by' name='created_by' value={addproducts.created_by} onChange={handleChange}></input>
                {/* <input type='text' placeholder='updated_by' name='updated_by' value={addproducts.updated_by} onChange={handleChange}></input> */}

                <button type='submit'>add products</button>
            </form>
        </div>
    )
}

export default AddProducts