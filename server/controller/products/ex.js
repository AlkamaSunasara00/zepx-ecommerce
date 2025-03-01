// const updateproducts = (req, res) => {
//     const { id } = req.params;
//     let { title, price, discount, memory, size, storage, description, status, updated_by } = req.body;
  
//     // 🖼 Handle Image Upload (Check if new images are uploaded)
//     let img = req.files && req.files.length > 0 ? req.files.map(file => file.filename) : null;
  
//     // 📝 SQL Query aur Values dynamically create karein
//     let updateFields = [];
//     let values = [];
  
//     if (title !== undefined) { updateFields.push("title=?"); values.push(title); }
//     if (price !== undefined) { updateFields.push("price=?"); values.push(price); }
//     if (discount !== undefined) { updateFields.push("discount=?"); values.push(discount); }
//     if (memory !== undefined) { updateFields.push("memory=?"); values.push(memory); }
//     if (size !== undefined) { updateFields.push("size=?"); values.push(size); }
//     if (storage !== undefined) { updateFields.push("storage=?"); values.push(storage); }
//     if (description !== undefined) { updateFields.push("description=?"); values.push(description); }
//     if (status !== undefined) { updateFields.push("status=?"); values.push(status); }
//     if (updated_by !== undefined) { updateFields.push("updated_by=?"); values.push(updated_by); }
  
//     // 🖼 Agar naye images aaye hain to update karo
//     if (img !== null) {
//         updateFields.push("img=?");
//         values.push(JSON.stringify(img)); // ✅ Ensure JSON formatting is correct
//     }
  
//     if (updateFields.length === 0) {
//         return res.status(200).json({ message: "No changes detected, product not updated" });
//     }
  
//     values.push(id);
  
//     // 📝 Final SQL Query
//     const updateQuery = `UPDATE products SET ${updateFields.join(", ")} WHERE product_id=?`;
  
//     connection.query(updateQuery, values, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Internal Server Error", details: err.message });
//         }
//         return res.status(200).json({ message: "Product updated successfully", results });
//     });
//   };

















  



//   const updateproducts = (req, res) => {
//     const { id } = req.params;
//     const { title, price, discount, memory, size, storage, description, status, created_by, updated_by } = req.body;
  
//     const images = req.files  ? req.files.map(file => file.filename) : JSON.parse(req.body.img|| []);
  
//     const imgString = JSON.stringify(images); // ✅ JSON.stringify() sirf yahan ek baar hoga
  
//     const query = `UPDATE products SET title=?, price=?, discount=?, memory=?, size=?, storage=?, img=?, description=?, status=?, created_by=?, updated_by=? WHERE product_id=?`;
//     const values = [title, price, discount, memory, size, storage, imgString, description, status, created_by, updated_by || '', id];
  
//     connection.query(query, values, (err, results) => {
//         if (err) return res.status(500).json({ error: "Internal Server Error" });
//         return res.status(200).json({ message: "Product updated successfully", results });
//     });
//   };
  















// const updateproducts = (req, res) => {
//   const { id } = req.params;
//   const { title, price, discount, memory, size, storage, description, status, updated_by, keepExistingImg } = req.body;
  
//   console.log("🛠 Updating product ID:", id);
  
//   let newImages = req.files?.length ? req.files.map(file => file.filename) : [];
  
//   let existingImages = req.body.existingImages ? 
//       (Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages]) 
//       : [];

//   // 🛠 Merge existing images only if keepExistingImg is true
//   let finalImages = keepExistingImg === "true" ? [...existingImages, ...newImages] : newImages;

//   console.log("📸 Final Images to Save:", finalImages);

//   const query = `
//       UPDATE products 
//       SET title=?, price=?, discount=?, memory=?, size=?, storage=?, 
//           img=?, description=?, status=?, updated_by=? 
//       WHERE product_id=?`;

//   const values = [
//       title, price, discount, memory, size, storage, 
//       JSON.stringify(finalImages), description, status, updated_by, id
//   ];

//   connection.query(query, values, (err, results) => {
//       if (err) {
//           console.error("❌ MySQL Error:", err.message);
//           return res.status(500).json({ error: "Internal Server Error", details: err.message });
//       }
      
//       console.log("✅ Product Updated Successfully:", results);
//       return res.status(200).json({ message: "Product updated successfully", results });
//   });
// };
















const updateproducts = (req, res) => {
    const { id } = req.params;
    const { title, price, discount, memory, size, storage, description, status, updated_by } = req.body;
    let images = req.files ? req.files.map(file => file.filename) : null; // null rakho agar naye images nahi aaye
  
    // Pehle database se existing images le aao
    const getImageQuery = "SELECT img FROM products WHERE product_id=?";
    connection.query(getImageQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
  
      let existingImages = results.length > 0 ? JSON.parse(results[0].img || "[]") : [];
  
      // Agar naye images nahi aaye, to purani images hi rakh lo
      if (!images) {
        images = existingImages;
      }
  
      const updateQuery = `UPDATE products SET title=?, price=?, discount=?, memory=?, size=?, storage=?, img=?, description=?, status=?, updated_by=? WHERE product_id=?`;
      const values = [title, price, discount, memory, size, storage, JSON.stringify(images), description, status, updated_by || '', id];
  
      connection.query(updateQuery, values, (err, results) => {
        if (err) return res.status(500).json({ error: "Internal Server Error" });
        return res.status(200).json({ message: "Product updated successfully", results });
      });
    });
  };
  