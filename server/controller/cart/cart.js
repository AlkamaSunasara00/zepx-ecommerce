const connection = require("../../connection/connection");



const addToCart = (req, res) => {
    const { user_id, product_id, quantity, total_amount } = req.body;
    const query = "INSERT INTO cart (user_id, product_id, quantity,total_amount) VALUES (?, ?, ?,?)";
    connection.query(query, [user_id, product_id, quantity, total_amount], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(results)
        }
    })
}



const getCart = (req, res) => {
    const query = "SELECT * FROM cartt ";
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(result)
        }
    })
}



const getCartByUserId = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM cart WHERE user_id = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(result)
        }
    })
}





const updateCartQuantity = (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const query = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?"
    connection.query(query, [quantity, user_id, product_id], (err, result) => {
        if (err) {
            res.status(500).json({ err: "error in fetching" })
        } else {
            res.status(200).json(result)
        }
    })
}

const deleteCart = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM cart WHERE cart_id=?";
    connection.query(q, [id], (err, results) => {
        if (err) {
            res.status(500).json({ err: "error in deleting" })
        } else {
            res.status(200).json(results);
        }
    })
}




const mergeCart = (req, res) => {
  const { user_id, cartItems } = req.body;

  if (!user_id || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    cartItems.forEach(async (item) => {
      const existingItem = await new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
          [user_id, item.product_id],
          (err, results) => {
            if (err) reject(err);
            else resolve(results[0]); // Resolve with the first result or undefined
          }
        );
      });

      if (existingItem) {
        // Update existing item
        await new Promise((resolve, reject) => {
          connection.query(
            "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
            [item.quantity, user_id, item.product_id],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
      } else {
        // Insert new item
        const product = await new Promise((resolve, reject) => {
          connection.query(
            "SELECT price FROM products WHERE product_id = ?",
            [item.product_id],
            (err, results) => {
              if (err) reject(err);
              else resolve(results[0]);
            }
          );
        });

        if (product) {
          const totalAmount = item.quantity * product.price;
          await new Promise((resolve, reject) => {
            connection.query(
              "INSERT INTO cart (user_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?)",
              [user_id, item.product_id, item.quantity, totalAmount],
              (err, results) => {
                if (err) reject(err);
                else resolve(results);
              }
            );
          });
        }
      }
    });

    res.status(200).json({ message: "Cart merged successfully" });
  } catch (err) {
    console.error("Error merging cart:", err);
    res.status(500).json({ error: "Failed to merge cart" });
  }
};




module.exports = { addToCart, getCart, getCartByUserId, updateCartQuantity ,deleteCart,mergeCart};