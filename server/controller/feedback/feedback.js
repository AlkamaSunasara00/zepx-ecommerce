const connection=require("../../connection/connection");


// for get api


const getfeedback = (req, res) => {
    const q = "SELECT feedback_id, user_id, username, feedback FROM feedback"; // Include username
    connection.query(q, (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" });
        } else {
            res.status(200).json(results);
        }
    });
};

const deletefeedback = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM feedback WHERE feedback_id = ?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}


const addfeedback = (req, res) => {
    const { user_id, username, feedback } = req.body;

    if (!user_id || !username || !feedback) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const q = "INSERT INTO feedback (user_id, username, feedback) VALUES (?, ?, ?)";
    const data = [user_id, username, feedback];

    connection.query(q, data, (err, results) => {
        if (err) {
            console.error("Error inserting feedback:", err.sqlMessage); // Log detailed SQL error
            return res.status(500).json({ error: "Error inserting feedback" });
        }
        res.status(200).json({ message: "Feedback added successfully" });
    });
};


module.exports={getfeedback,addfeedback,deletefeedback};