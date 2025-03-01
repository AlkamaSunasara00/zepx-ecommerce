import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../../assets/css/admin/banner/banner.css';
// import "../../../public/uploads"
import { useRef } from "react";

const port = process.env.REACT_APP_URL;

function Banner() {
    const [fetchbanner, setfetchbanner] = useState([]);
    const [addbanner, setaddbanner] = useState({
        img: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        getbanner();
    }, [navigate]);


    const getbanner = async (e) => {
        try {
            const res = await axios.get(`${port}/getbanner`);
            setfetchbanner(res.data)
            console.log(fetchbanner);
            console.log(res.data)


        } catch (error) {
            console.error(error);

        }

    }


    
    const deletebanner = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete product")
        if (confirm)
            try {
                await axios.delete(`${port}/deletebanner/${id}`);
                getbanner();
            } catch (error) {
                console.error(error);

            }
    }



    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const selectedFile = files[0];

            // Create FormData directly
            const formdata = new FormData();
            formdata.append("img", selectedFile);

            try {
                const response = await axios.post(`${port}/addbanner`, formdata, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                console.log("Upload Success:", response.data);

                // Refresh banner list after upload
                getbanner();
            } catch (error) {
                console.error("Upload Error:", error);
            }
        }
    };


    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div className='main-banner-container'>
            <div className='header-banner'>
                <div className='header-banner-txt'>
                    <p>Banner</p>
                </div>
            </div>
            <div className='banner-table'>
                <div className='sub1-banner-table'>
                    <p>Current Banner</p>
                </div>



                <div className='sub-banner-table'>

                    {fetchbanner.map((item) => {
                        return (
                            <div className='banner-imgg'>
                                <img src={`../uploads/${item.img}`} alt={`banner-${item.banner_id}`} />
                                <div className='banner-imgg-icon'><button onClick={() => deletebanner(item.banner_id)}><i class="fa-solid fa-xmark"></i></button></div>


                           </div>


                        )
                    })}
                </div>

            </div >
            <div className='main-add-image'>
                <div className='add-image-txt'>
                    <p>Upload New One</p>
                </div>
                {<form  >
                    <div className='sub-add-image' onClick={handleButtonClick}>
                        <div className='add-image'>
                            <div className='add-image-icon'>
                                <i class="fa-regular fa-image"></i>
                            </div>
                            <div className='add-image-txt'>
                                <p>click here to add image</p>
                            </div>
                            <div className='add-image-button'>
                                <label id="upload">
                                    <button type='button'>Add Image</button>
                                </label>
                                <input
                                    type="file"
                                    name="img"
                                    ref={fileInputRef}
                                    id="upload"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />


                            </div>
                        </div>
                    </div>
                </form>}
            </div>
        </div >
    );
}

export default Banner;









// import React from 'react';
// import '../../../../assets/css/admin/banner/banner.css';
// import { useRef } from "react";

// function Banner() {

//     const fileInputRef = useRef(null);
//     const handleButtonClick = () => {
//         fileInputRef.current.click();
//     };
//     return (
//         <div className='main-banner-container'>
//             <div className='header-banner'>
//                 <div className='header-banner-txt'>
//                     <p>Banner</p>
//                 </div>
//             </div>
//             <div className='banner-table'>
//                 <div className='sub1-banner-table'>
//                     <p>Current Banner</p>
//                 </div>
//                 <div className='sub-banner-table'>
//                     <div className='banner-imgg'>
//                         <img src={require('../../../../assets/images/mobileBanner.png')}></img>
//                         <div className='banner-imgg-icon'><button><i class="fa-solid fa-xmark"></i></button></div>
//                     </div>
                    
//                 </div>
//             </div >
//             <div className='main-add-image'>
//                 <div className='add-image-txt'>
//                     <p>Upload New One</p>
//                 </div>
//                 <div className='sub-add-image' onClick={handleButtonClick}>
//                         <div className='add-image'>
//                             <div className='add-image-icon'>
//                                 <i class="fa-regular fa-image"></i>
//                             </div>
//                             <div className='add-image-txt'>
//                                 <p>click here to add image</p>
//                             </div>
//                             <div className='add-image-button'>
//                                 <label id="upload">
//                                     <button type='button' onClick={handleButtonClick}>Add Image</button>
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="img"
//                                     ref={fileInputRef}
//                                     id="upload"
//                                     // onChange={handleFileChange}
//                                     accept="image/*"
//                                     style={{ display: "none" }}
//                                 />
//                             </div>
//                         </div>
//                 </div>
//             </div>
//         </div >
//     );
// }

// export default Banner;