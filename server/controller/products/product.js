const connection = require("../../connection/connection");

// for get api


const getproduct = (req, res) => {
  const q = "SELECT * FROM products";
  connection.query(q, (err, results) => {
    if (err) {
      res.status(500).json({ err: "error in fetching" })
    } else {
      res.status(200).json(results)
    }
  })

};

const getproductsbycategory = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE category_id = ?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      res.status(500).json({ err: "error in fetching" })
    } else {
      res.status(200).json(results)
    }
  })

};


// get api by id

const getproductsbyid = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE product_id=?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ err: "internal server error " })
    } else {
      return res.status(200).json(results)
    }
  })
}
const getproductsbycategoryid = (req, res) => {
  const { id } = req.params;
  console.log(id)
  const q = "SELECT * FROM products WHERE category_id =?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ err: "internal server error " })
    } else {
      return res.status(200).json(results)
    }
  })
}



// status api

// const productstatus=(req,res)=>{
//     const {id}=req.params;
//     const {status}=req.body;
//     const q="UPDATE products SET status=? WHERE product_id=?";
//     connection.query(q, [status],[id], (err, results) => {
//         if (err) {
//             console.error(err); // Log the error
//             res.status(500).json({ err: "error in fetching" })
//         } else {
//             res.status(200).json(results)
//         }
//     })
// }


const productstatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const q = "UPDATE products SET status=? WHERE product_id=?";

  connection.query(q, [status, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: "Error in updating status" });
    } else {
      res.status(200).json({ message: "Product status updated successfully" });
    }
  });
};




// add api 
const addproduct = (req, res) => {
  const { category_id, title, price, discount, tax, memory, size, storage, description, status, created_by, updated_by } = req.body;
  const images = req.files ? req.files.map(file => file.filename) : [];
  const q = "INSERT INTO products (category_id,title,price,discount,tax,memory,size,storage,img,description,status,created_by,updated_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const data = [category_id, title, price, discount, tax, memory, size, storage, JSON.stringify(images), description, status, created_by, updated_by || ''];
  connection.query(q, data, (err, results) => {
    if (err) {
      console.error(err); // Log the error
      res.status(500).json({ err: "error in fetching" })
    } else {
      res.status(200).json(results)
    }
  })

};

// update api





const updateproducts = (req, res) => {
  const { id } = req.params;
  const { title, price, discount, tax, memory, size, storage, description, status, updated_by } = req.body;

  let newImages = req.files ? req.files.map(file => file.filename) : null; // Null if no new images

  // Pehle existing images fetch karenge
  const getImageQuery = "SELECT img FROM products WHERE product_id = ?";
  connection.query(getImageQuery, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Pehle se jo images database me hain unko le lo
    let existingImages = results.length > 0 && results[0].img ? JSON.parse(results[0].img) : [];

    // Agar naye images aayi hain to unko replace kar do, warna purani rehne do
    let images = newImages && newImages.length > 0 ? newImages : existingImages;

    const updateQuery = `UPDATE products SET title=?, price=?, discount=?,tax=?, memory=?, size=?, storage=?, img=?, description=?, status=?, updated_by=? WHERE product_id=?`;
    const values = [title, price, discount, tax, memory, size, storage, JSON.stringify(images), description, status, updated_by || '', id];

    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Product updated successfully", results });
    });
  });
};









// delete api
const deleteproducts = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM products WHERE product_id =?";
  connection.query(q, [id], (err, results) => {
    if (err) {
      res.status(500).json({ err: "error in deleting" })
    } else {
      res.status(200).json(results);
    }
  })
}



module.exports = { getproduct, getproductsbycategory, getproductsbyid, getproductsbycategoryid, addproduct, updateproducts, deleteproducts, productstatus };




