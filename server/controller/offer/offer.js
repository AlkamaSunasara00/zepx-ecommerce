const connection=require("../../connection/connection");

// Get offers
const getoffer = (req, res) => {
    const q = "SELECT * FROM offer";
    connection.query(q, (err, results) => {
        if (err) {
            return res.status(500).json({ err: "Error fetching data" });
        }return  res.status(200).json(results);

    });
};

// Add offer
const addoffer = (req, res) => {
    console.log("Adding new offer...");
    const { heading_1, heading_2 } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image || !heading_1 || !heading_2) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const q = "INSERT INTO offer (img, heading_1, heading_2) VALUES (?, ?, ?)";
    const data = [image, heading_1, heading_2];

    connection.query(q, data, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ err: "Error inserting data" });
        }
        return res.status(200).json({ message: "Offer added successfully!" });
    });
};



const updateoffer = (req, res) => {
    const { id } = req.params;
    const { heading_1, heading_2, img } = req.body;
    const image = req.file ? req.file.filename : req.body.img || null;
    const q = "UPDATE offer SET heading_1=?, heading_2=?,img=? WHERE user_id = ?";
    const data = [heading_1, heading_2, image, id];
    connection.query(q, data, (err, results) => {
      if (err) {
        return res.status(500).json({ err: "internal server error " })
      } else {
        return res.status(200).json(results)
      }
    })
  
  }


    // delete   api 

const deleteoffer = (req, res) => {
    const q = "DELETE FROM offer WHERE img=?";
    connection.query(q,(err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}

// const connection = require("../../connection/connection");

// // Get the latest offer
// const getoffer = (req, res) => {
//     const q = "SELECT * FROM offer ORDER BY id DESC LIMIT 1"; // Only fetch latest offer
//     connection.query(q, (err, results) => {
//         if (err) {
//             return res.status(500).json({ err: "Error fetching data" });
//         }
//         return res.status(200).json(results);
//     });
// };

// // Add a new offer (delete existing first)
// const addoffer = (req, res) => {
//     console.log("Adding new offer...");
//     const { heading_1, heading_2 } = req.body;
//     const image = req.file ? req.file.filename : null;

//     if (!image || !heading_1 || !heading_2) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     // Delete the previous offer before inserting a new one
//     const deleteQuery = "DELETE FROM offer";
//     connection.query(deleteQuery, (err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ err: "Error deleting previous offer" });
//         }

//         // Insert the new offer
//         const insertQuery = "INSERT INTO offer (img, heading_1, heading_2) VALUES (?, ?, ?)";
//         const data = [image, heading_1, heading_2];

//         connection.query(insertQuery, data, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({ err: "Error inserting data" });
//             }
//             return res.status(200).json({ message: "Offer added successfully!" });
//         });
//     });
// };




   module.exports={getoffer,addoffer,updateoffer,deleteoffer}