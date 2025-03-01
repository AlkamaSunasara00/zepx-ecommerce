import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/offer.css";

function Offer() {
    const [offer, setOffer] = useState(null);

    // const port = process.env.REACT_APP_URL || "http://localhost:4800"; 

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`http://localhost:4800/getoffer`);
                if (response.data.length > 0) {
                    setOffer(response.data[0]); 
                    console.log(response.data[0])
                }
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
    
        fetchOffer();
    }, []);

    return (
        <div>
            {offer ? (
                <div className="offer-section">
                    <div className="offer-container">
                        <h2>{offer.heading_1}</h2>
                        <p>{offer.heading_2}</p>

                        <div className="offer-image">
                            <img src={`./uploads/${offer.img}`} alt="Offer"/>
                        </div>
                        <button className="offer-btn">Shop Now</button>
                    </div>
                </div>
            ) : (
                <div className="loading-container">
                    <p>Loading offers</p>
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Offer;

























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../assets/css/offer.css";

// function Offer() {
//     const [offer, setOffer] = useState(null);

//     useEffect(() => {
//         const fetchOffer = async () => {
//             try {
//                 const response = await axios.get("http://localhost:4800/getoffer");
//                 if (response.data.length > 0) {
//                     setOffer(response.data[0]); 
//                 }
//             } catch (error) {
//                 console.error("Error fetching offer:", error);
//             }
//         };
    
//         fetchOffer();
//     }, []);
    

//     return (
//         <div>
//             {offer ? (
//                 <div className="offer-section">
//                     <div className="offer-container">
//                         <h2>{offer.heading_1}</h2>
//                         <p>{offer.heading_2}</p>

//                         <div className="offer-image">
//                             <img src={offer.img} alt="Offer" />
//                         </div>
//                         <button className="offer-btn">Shop Now</button>
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading offers...</p>
//             )}
//         </div>
//     );
// }

// export default Offer;
