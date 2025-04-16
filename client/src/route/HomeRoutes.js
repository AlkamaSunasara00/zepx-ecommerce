import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import Contact from "../pages/contact/Contact";
import About from "../pages/about-us/About";
import Account from "../pages/profile/Account";
import UserInfo from "../pages/profile/UserInfo";
import OrderHistory from '../pages/profile/OrderHistory'
import Cart from "../pages/shopping-cart/Cart";
import Products from "../pages/product/products";
import Item from "../pages/item/Item";
import Product from "../pages/product/Product";
import CheckOut from "../pages/check-out/CheckOut";
import AddProducts from "../pages/abc/AddProd";
import UpdateProducts from "../pages/abc/UpdateProd";
import Prod from "../pages/abc/Prod";
import NotFound from "../pages/notfound/NotFound";
import ScrollToTop from "../pages/scrollTop/Scroll";
import ForgotPassword from "../pages/user/ForgetPassword";
import Orders from "../pages/orders/Orders";
import OrderConfirmation from "../pages/check-out/OrderConfirmation";

function HomeRoutes() {
  return (
    <>
     <ScrollToTop />
    <Routes>
      <Route path="/Prod" element={<Prod />} />    
      <Route path="/UpdateProducts" element={<UpdateProducts />} />    
      <Route path="/AddProducts" element={<AddProducts />} />
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/user" element={<Account />}>
          <Route path="account-info" element={<UserInfo />} />
          <Route path="order-history" element={<OrderHistory/>}/>
      </Route>
      <Route path="/Product" element={<Product />} >
        <Route path="Products/:id" element={<Products />} />
        <Route path="Products" element={<Products />} />
      </Route>
      <Route path="/Item/:id" element={<Item />} />
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      {/* {<Route path="*" element={<NotFound/>} /> } */}
     
      
    </Routes>
    </>
  );
}

export default HomeRoutes;