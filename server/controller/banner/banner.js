const connection=require("../../connection/connection");




// for get api


const getbanner=(req,res)=>{
    const q = "SELECT * FROM banner";
    connection.query(q, (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(results)
        }
    })

};



// add api 
const addbanner=(req,res)=>{
    console.log("in server site console add banner image")
    // const {name,created_by,updated_by}=req.body;
    const image =req.file? req.file.filename:null;
    const q="INSERT INTO banner (img) VALUES (?)";
    const data=[image];
        connection.query(q, data, (err, results) => {
           if (err) {
            console.log(err)
               return res.status(500).json({ err: "error in fetching" })
           } else {
            return res.status(200).json(results)
           }
       })
   
   };



    // delete   api 

const deletebanner = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM banner WHERE banner_id=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}


   module.exports={getbanner,addbanner,deletebanner}