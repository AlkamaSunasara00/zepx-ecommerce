const connection=require("../../connection/connection");


// for get api


const getcategory=(req,res)=>{
    const q = "SELECT * FROM categories";
    connection.query(q, (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(results)
        }
    })

};

// get  by id api

const getcategorybyid = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM categories WHERE category_id=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ err: "internal server error " })
        } else {
            return res.status(200).json(results)
        }
    })
}

const getcategorybyname = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM categories WHERE name=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ err: "internal server error " })
        } else {
            return res.status(200).json(results)
        }
    })
}


// add api 
const addcategory=(req,res)=>{
    const {name,created_by,updated_by}=req.body;
    const image =req.file? req.file.filename:null;
    const q="INSERT INTO categories (name,img,created_by,updated_by) VALUES (?,?,?,?)";
    const data=[name,image,created_by,updated_by|| ''];
        connection.query(q, data, (err, results) => {
           if (err) {
               res.status(500).json({ err: "error in fetching" })
           } else {
               res.status(200).json(results)
           }
       })
   
   };



//    update  by id

const updatecategory = (req, res) => {
    const { id } = req.params;
    const { name,created_by,updated_by } = req.body;
    const image = req.file ? req.file.filename : req.body.img || null;
    const q = "UPDATE categories SET name=?, img=?, created_by=?, updated_by=? WHERE category_id  = ?";
    const data = [name,image,created_by,updated_by|| '',  id];
    connection.query(q, data, (err, results) => {
      if (err) {
        return res.status(500).json({ err: "internal server error " })
      } else {
        return res.status(200).json(results)
      }
    })
  
  };



  // delete   api 

const deletecategory = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM categories WHERE category_id=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}



module.exports={getcategory,getcategorybyid,getcategorybyname,addcategory,updatecategory,deletecategory}






  