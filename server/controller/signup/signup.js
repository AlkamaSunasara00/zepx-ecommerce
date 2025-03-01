const connection = require("../../connection/connection");
const bcrypt = require("bcrypt");



// ==================================== (add users api) ====================================
// ===================================== (bcrypt.hash) =====================================


const addUser = async (req, res) => {

  const { first_name, last_name, username, email, password, contact, address, img } = req.body;
  // console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);


  const sqlQuery = `
  INSERT INTO user  (first_name, last_name, username, email, password, contact, address, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const data = [first_name || '', last_name || '', username, email, hashedPassword, contact, address || '', img || ''];
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

const deleteuser = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM user WHERE user_id=?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      res.status(500).json({ err: "error in deleting" })
    } else {
      res.status(200).json(results);
    }
  })
}

module.exports = {
  getUser,
  addUser,
  login,
  userstatus,
  getuserbyid,
  updatedata,
  deleteuser
};