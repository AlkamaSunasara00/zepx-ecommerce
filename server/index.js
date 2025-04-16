// import in Index.js in server

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport"); //  Import passport globally
dotenv.config();

const connection = require("./connection/connection");
require("./routes/googleAuth/passport"); //  Load Google OAuth Config

const signup = require("./routes/signup/signup");
const contact = require("./routes/contact/contact");
const category = require("./routes/category/category");
const product = require("./routes/products/product");
const cart = require("./routes/cart/cart");
const getoffer = require("./routes/offer/offer");
const banner = require("./routes/banner/banner");
const offer = require("./routes/offer/offer");
const admin = require("./routes/Admin/login/login");
const feedback = require("./routes/feedback/feedback");
const googleAuth = require("./routes/googleAuth/googleAuth"); //  Google Auth Routes
const orders = require("./routes/orders/orders"); //  Google Auth Routes

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());




//  Register Routes
app.use("/", signup);
app.use("/", contact);
app.use("/", category);
app.use("/", product);
app.use("/", cart);
app.use("/", getoffer);
app.use("/", banner);
app.use("/", offer);
app.use("/", admin);
app.use("/", feedback);
app.use("/auth", googleAuth);
app.use("/", orders);





//  Fix the .env variables
const PORT = process.env.PORT || 4800;

connection.connect((error) => {
    if (error) {
        console.log("Database Connection Failed!");
    } else {
        console.log(" Database Connected!");
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});