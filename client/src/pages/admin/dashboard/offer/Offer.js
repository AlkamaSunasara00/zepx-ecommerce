import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../../../assets/css/admin/offer/offer.css";

function Offer() {
    const [offer, setOffer] = useState(null);
    const [heading1, setHeading1] = useState("");
    const [heading2, setHeading2] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    // Fetch offers from API
    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const response = await axios.get(`http://localhost:4800/getoffer`);
            if (response.data.length > 0) {
                setOffer(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching offer:", error);
        }
    };


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    // const handleAddOffer = async (e) => {
    //     e.preventDefault();
    //     if (!selectedFile || !heading1 || !heading2) {
    //         alert("Please provide all details.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("img", selectedFile);
    //     formData.append("heading_1", heading1);
    //     formData.append("heading_2", heading2);

    //     try {
    //         await axios.post(`http://localhost:4800/addoffer`, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         setSelectedFile(null);
    //         setHeading1("");
    //         setHeading2("");
    //         fetchOffer();
    //     } catch (error) {
    //         console.error("Error adding offer:", error);
    //     }
    // };
    const handleAddOffer = async (e) => {
        e.preventDefault();
        if (!selectedFile || !heading1 || !heading2) {
            alert("Please provide all details.");
            return;
        }

        const formData = new FormData();
        formData.append("img", selectedFile);
        formData.append("heading_1", heading1);
        formData.append("heading_2", heading2);

        try {
            await axios.post(`http://localhost:4800/addoffer`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSelectedFile(null);
            setHeading1("");
            setHeading2("");

            fetchOffer();
        } catch (error) {
            console.error("Error adding offer:", error);
        }
    };

    return (
        <div className="main-offer-container">
            <div className="header-offer">
                <div className="header-offer-txt">
                    <p>Offer</p>
                </div>
            </div>
            <div className="offer-table">
                <div className="sub1-offer-table">
                    <p>Current Offer</p>
                </div>
                <div className="sub-offer-table">
                    <div className="offer-img">
                        {offer && <img src={`../uploads/${offer.img}`} alt="Offer" />}
                    </div>
                    <div className="offer-heading">

                        <div className="offer-heading1">
                            <div><label>Heading 1</label></div>
                            <input
                                type="text"
                                name="heading1"
                                value={offer?.heading_1 || "No Heading"} // 🛠 Fixed here
                                readOnly
                            />
                        </div>
                        <div className="offer-heading1">
                            <div><label>Heading 2</label></div>
                            <input
                                type="text"
                                name="heading1"
                                value={offer?.heading_2 || "No Heading"} // 🛠 Fixed here
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-offers-add-image">
                <div className="main-offer-add-image">
                    <div className="add-offer-image-txt">
                        <p>Upload New One</p>
                    </div>
                    <div className="sub-offer-add-image" onClick={() => fileInputRef.current.click()}>
                        <div className="add-offer-image">
                            <div className="add-offer-image-icon">
                                <i className="fa-regular fa-image"></i>
                            </div>
                            <div className="add-offer-image-txt">
                                <p>Click here to add image</p>
                            </div>
                            <div className="add-offer-image-button">
                                <label id="upload">
                                    <button type="button">Add Image</button>
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    id="upload"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="headers">
                    <form onSubmit={handleAddOffer}>
                        <p id="p">Headers</p>
                        <div className="sub-headers">
                            <div className="input-header1">
                                <div><label>Heading 1</label></div>
                                <input
                                    type="text"
                                    placeholder="Type heading 1 here..."
                                    name="heading1"
                                    value={heading1}
                                    onChange={(e) => setHeading1(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-header1">
                                <div><label>Heading 2</label></div>
                                <input
                                    type="text"
                                    placeholder="Type heading 2 here..."
                                    name="heading2"
                                    value={heading2}
                                    onChange={(e) => setHeading2(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="offer-upload">
                                <button type="submit">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Offer;