const connection = require("../../connection/connection");


const getcontact = (req, res) => {
    const q = "SELECT * FROM contact";
    connection.query(q, (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(results)
        }
    })

};


const addcontact=(req,res)=>{
 const {user_id,first_name,last_name,email,contact,message}=req.body;
 const q="INSERT INTO contact (user_id,first_name,last_name,email,contact,message) VALUES (?,?,?,?,?,?)";
 const data=[user_id,first_name,last_name,email,contact,message];
     connection.query(q, data, (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(results)
        }
    })

};


const deletecontact = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM contact WHERE contact_id = ?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}


module.exports = { getcontact, addcontact,deletecontact };