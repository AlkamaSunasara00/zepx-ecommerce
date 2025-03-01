const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");



const connection = require("./connection/connection");
const signup = require("./routes/signup/signup");
const contact=require("./routes/contact/contact");
const category=require("./routes/category/category");
const product=require("./routes/products/product");
const cart=require("./routes/cart/cart");
const getoffer=require("./routes/offer/offer")
const banner=require("./routes/banner/banner")
const offer=require("./routes/offer/offer")
const admin=require("./routes/Admin/login/login")
const feedback=require("./routes/feedback/feedback")




const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());


app.use("/", signup);
app.use("/", contact);
app.use("/", category);
app.use("/", product);
app.use("/", cart);
app.use("/",getoffer)
app.use("/",banner)
app.use("/",offer)
app.use("/",admin)
app.use("/",feedback)
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const URL=process.env.URL;

connection.connect((error) => {
    if (error) {
        console.log("failed");
    }else{
        console.log("Connected")
    }
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${URL}`);

    })
})
