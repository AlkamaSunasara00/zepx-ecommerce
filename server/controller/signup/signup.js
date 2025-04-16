const connection = require("../../connection/connection");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const util = require("util");



// Promisify the queries
connection.query = util.promisify(connection.query);


// ==================================== (add users api) ====================================
// ===================================== (bcrypt.hash) =====================================

const addUser = async (req, res) => {

  const { first_name, last_name, username, email, password, contact, address, img } = req.body;
  // console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  const status = "active"; 

  const sqlQuery = `
  INSERT INTO user  (first_name, last_name, username, email, password, contact, address, img,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
  const data = [first_name || '', last_name || '', username, email, hashedPassword, contact, address || '', img || '',status];
  // console.log(sqlQuery, data);

  connection.query(sqlQuery, data, (err) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(200)
    }
  });

};

// ===================================== (bcrypt.compare) =====================================



// login api


const login = async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM user WHERE username = ?";
  connection.query(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user_id: user.user_id,
      username: user.username,  // Make sure to return username
      status: user.status
    });
  });
};








// ==================================== (show users api) ====================================

const getUser = (req, res) => {
  const sqlQuery = "SELECT * FROM user";
  connection.query(sqlQuery, (err, data) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(data);
    }
  });
};



// getuserby id



const getuserbyid = (req, res) => {
  const { id } = req.params;
  const sqlQuery = "SELECT * FROM user WHERE user_id = ?";
  connection.query(sqlQuery, [id], (err, data) => {
    if (err) {
      return res.status(500)
    } else {
      return res.json(data);
    }
  });
};

// ============================= Update User Status API =============================
const userstatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Allowed: 'active' or 'inactive'" });
  }

  connection.query("SELECT * FROM user WHERE user_id = ?", [id], (err, results) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error while checking user" });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      connection.query("UPDATE user SET status = ? WHERE user_id = ?", [status, id], (updateErr) => {
          if (updateErr) {
              console.error("Status update error:", updateErr);
              return res.status(500).json({ error: "Error updating user status" });
          }

          console.log(`User ID ${id} status changed to ${status}`);
          res.status(200).json({ message: "User status updated successfully", status });
      });
  });
};





// update data by id
const updatedata = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, email, contact, address } = req.body;
  const image = req.file ? req.file.filename : req.body.img || null;
  const q = "UPDATE user SET first_name=?, last_name=?, username=?, email=?, contact=?, address=?, img=? WHERE user_id = ?";
  const data = [first_name, last_name, username, email, contact, address, image, id];
  connection.query(q, data, (err, results) => {
    if (err) {
      return res.status(500).json({ err: "internal server error " })
    } else {
      return res.status(200).json(results)
    }
  })

}



// delete api
const deleteuser = (req, res) => {
  const { id } = req.params;

  // First, delete from cart table where product_id is referenced
  const deleteFromCart = "DELETE FROM cart WHERE user_id = ?";
  connection.query(deleteFromCart, [id], (err, results) => {
      if (err) {
          console.error("Error deleting from cart:", err);
          return res.status(500).json({ error: "Error deleting product from cart", details: err });
      }

      // Now, delete from products table
      const deleteFromProducts = "DELETE FROM user WHERE user_id=?";
      connection.query(deleteFromProducts, [id], (err, results) => {
          if (err) {
              console.error("Error deleting product:", err);
              return res.status(500).json({ error: "Error deleting product", details: err });
          }

          res.status(200).json({ message: "Product deleted successfully" });
      });
  });
};



// Send OTP for Password Reset
const sendPasswordResetOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if email exists in database
        const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);
        if (results.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        await connection.query("Update user set otp_code = ? where email = ? ", [otp, email])

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "asrarjabir786@gmail.com",  // Replace with your email
                pass: "jtmj iihg koat dyvg"  // Replace with generated App Password
            }
        });

        // Email options
        const mailOptions = {
            from: "asrarjabir786@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text:` Your OTP for password reset is: ${otp}`
        };

        // Send OTP email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ error: "Error sending OTP" });
    }
};



const verifyOTPCheck = async (req, res) => {
  try {
      const { email, otp } = req.body;

      const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);

      if (results.length === 0) {
          return res.status(404).json({ error: "Email not found" });
      }

      if (parseInt(results[0].otp_code) !== parseInt(otp)) {
          return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "Error verifying OTP" });
  }
};

// Verify OTP and Reset Password
const verifyOTP = async (req, res) => {
  try {
      const { email, otp, newPassword } = req.body;

      const results = await connection.query("SELECT * FROM user WHERE email = ?", [email]);

      if (results.length === 0) {
          return res.status(404).json({ error: "Email not found" });
      }

      if (parseInt(results[0].otp_code) !== parseInt(otp)) {
          return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password in DB
      await connection.query("UPDATE user SET password = ? WHERE email = ?", [hashedPassword, email]);

      res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Error resetting password" });
  }
};



module.exports = {
  getUser,
  addUser,
  login,
  userstatus,
  getuserbyid,
  updatedata,
  deleteuser,
  // sendOTP
  sendPasswordResetOTP,
  verifyOTPCheck,
  verifyOTP

};