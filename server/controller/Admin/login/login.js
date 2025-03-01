const connection = require("../../../connection/connection");
const bcrypt = require("bcrypt");



// ==================================== (add users api) ====================================
// ===================================== (bcrypt.hash) =====================================


const addadmin = async (req, res) => {

  const {username,email,contact,address,role,status,password } = req.body;
  // console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);
  const image =req.file? req.file.filename:null;


  const sqlQuery = `
  INSERT INTO admin (img,username,email,contact,address,role,status,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const data = [image,username,email,contact,address,role,status,hashedPassword];
  // console.log(sqlQuery, data);

  connection.query(sqlQuery, data, (err) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(200)
    }
  });

};



const updateadmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, contact, address, role, status, password } = req.body;

  try {
    let hashedPassword;

    // अगर user ने नया password डाला, तभी hash करो
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const image = req.file ? req.file.filename : req.body.img || null;

    // Query बनाओ (hashedPassword के साथ या बिना)
    const q = `UPDATE admin 
    SET img=?, username=?, email=?, contact=?, address=?, role=?, status=? 
    ${password ? ", password=?" : ""}  
    WHERE admin_id = ?`;

    // Data बनाओ (hashedPassword तभी add करो जब password नया हो)
    const data = password
      ? [image, username, email, contact, address, role, status, hashedPassword, id]
      : [image, username, email, contact, address, role, status, id];

    connection.query(q, data, (err, results) => {
      if (err) {
        return res.status(500).json({ err: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Admin updated successfully", results });
    });

  } catch (error) {
    return res.status(500).json({ err: "Error updating admin" });
  }
};








// getadminby id



// const getadminbyid = (req, res) => {
//   const {id}=req.params;
//   const sqlQuery = "SELECT * FROM admin WHERE admin_id = ?";
//   connection.query(sqlQuery,[id] ,(err, data) => {
//     if (err) {
//       return res.status(500)
//     } else {
//       return res.json(data);
//     }
//   });
// };




const getadminbyid = (req, res) => {
  const { id } = req.params; // ✅ Extracting admin ID from params

  const sqlQuery = "SELECT * FROM admin WHERE admin_id = ?";
  connection.query(sqlQuery, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" }); // ❌ Missing response message
    } else {
      if (data.length === 0) {
        return res.status(404).json({ error: "Admin not found" }); // ✅ Handle if admin ID doesn't exist
      }
      return res.json(data[0]); // ✅ Send only the first object instead of an array
    }
  });
};












// ==================================== (show users api) ====================================

const getAdmin = (req, res) => {
    const sqlQuery = "SELECT * FROM admin";
    connection.query(sqlQuery, (err, data) => {
      if (err) {
        return res.status(500)
      } else {
        return res.json(data);
      }
    });
  };


// ===================================== (bcrypt.compare) =====================================

// login api

// const loginAdmin = async (req, res) => {
//   const { identifier, password } = req.body; // 'identifier' can be username or email

//   const sql = "SELECT * FROM admin WHERE username = ? OR email = ?";
  
//   connection.query(sql, [identifier, identifier], async (err, results) => {
//       if (err) {
//           return res.status(500).json({ error: "Database error" });
//       }

//       if (results.length === 0) {
//           return res.status(401).json({ error: "Invalid username/email or password" });
//       }

//       const admin = results[0];


//       if (admin.status === "inactive") {
//           return res.status(403).json({ error: "Your account is inactive. Contact support." });
//       }

//       const isPasswordValid = await bcrypt.compare(password, admin.password);
      
//       if (!isPasswordValid) {
//           return res.status(401).json({ error: "Invalid username/email or password" });
//       }

//       return res.status(200).json({ 
//           message: "Login successful", 
//           admin_id: admin.admin_id,
//           status: admin.status
//       });
//   });
// };




const loginAdmin = async (req, res) => {
  const { identifier, password } = req.body; // 'identifier' can be username or email

  const sql = "SELECT * FROM admin WHERE username = ? OR email = ?";
  
  connection.query(sql, [identifier, identifier], async (err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
          return res.status(401).json({ error: "Invalid username/email or password" });
      }

      const admin = results[0];

      if (admin.status === "inactive") {
          return res.status(403).json({ error: "Your account is inactive. Contact support." });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid username/email or password" });
      }

      // ✅ Return username along with other details
      return res.status(200).json({ 
          message: "Login successful", 
          admin_id: admin.admin_id,
          username: admin.username, // ✅ Include this in the response
          status: admin.status
      });
  });
};



// status api

const adminstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Check if the admin exists
    const checkQuery = "SELECT * FROM admin WHERE admin_id = ?";
    connection.query(checkQuery, [id], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error while checking admin" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Validate status
      if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value. Allowed: 'active' or 'inactive'" });
      }

      // Update status
      const updateQuery = "UPDATE admin SET status=? WHERE admin_id=?";
      connection.query(updateQuery, [status, id], (err, updateResults) => {
        if (err) {
          console.error("Status Update Error:", err);
          return res.status(500).json({ error: "Error updating admin status" });
        }

        console.log(`Admin ID ${id} status changed to ${status}`);

        res.status(200).json({ 
          message: "Admin status updated successfully", 
          admin: { ...results[0], status } 
        });
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





  // delete   api 

  const deleteadmin = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM admin WHERE admin_id=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}



module.exports={getAdmin,getadminbyid,addadmin,loginAdmin,adminstatus,updateadmin,deleteadmin}