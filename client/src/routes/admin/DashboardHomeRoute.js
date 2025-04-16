// import React from "react";

// import { Routes, Route } from "react-router-dom";

// import Navbar from "../../pages/admin/layout/Navbar";

// import Dashboard from "../../pages/admin/dashboard/Dashboard";

// import Categories from "../../pages/admin/dashboard/product/Categories";

// import Category from "../../pages/admin/dashboard/category/Category";

// import Order from "../../pages/admin/dashboard/order/Order";

// import Coupon from "../../pages/admin/dashboard/coupon/Coupon";

// import Banner from "../../pages/admin/dashboard/banner/Banner";

// import Admin from "../../pages/admin/dashboard/admin-manage/Admin";

// import Transaction from "../../pages/admin/dashboard/transaction/Transaction";

// import Customer from "../../pages/admin/dashboard/customer-manage/Customer";

// import UpdateProduct from "../../pages/admin/dashboard/product/UpdateProduct";

// import Addcategory from "../../pages/admin/dashboard/product/Addcategory";

// import Addproduct from "../../pages/admin/dashboard/product/Addproduct";
// import Offer      from "../../pages/admin/dashboard/offer/Offer";
// import Login from "../../pages/admin/login/Login";
// import AddAdmin from "../../pages/admin/login/AddAdmin";
// import UpdateAdmin from "../../pages/admin/login/UpdateAdmin";
// import Contact from "../../pages/admin/dashboard/contact/Contact";



// const DashboardHomeRoute = () => {

//   return (

//     <>

//       <Routes>
//       <Route path="/admin/admin/login" element={<Login />} />

//         <Route path="/admin" element={<Navbar />}>

         

//           <Route path="/admin/Add-Product" element={<Addproduct />} />

//           <Route path="/admin/Update-Product" element={<UpdateProduct />} />

//           <Route path="/admin/add-category" element={<Addcategory />} />

//           <Route path="dashboard" element={<Dashboard />} />

//           <Route path="products/Categories/:id" element={<Categories />} />

//           <Route path="category" element={<Category />} />

//           <Route path="order" element={<Order />} />

//           <Route path="coupon" element={<Coupon />} />

//           <Route path="banner" element={<Banner />} />

//           <Route path="offer" element={<Offer />} />

//           <Route path="admin-manage" element={<Admin />}/>

//           <Route path="/admin/add-admin" element={<AddAdmin/>} />
//           <Route path="/admin/update-admin" element={<UpdateAdmin/>} />

//           <Route path="contact" element={<Contact/>} />

//           <Route path="customer-manage" element={<Customer />} />

//           <Route path="transaction" element={<Transaction />} />

          

//         </Route>

//       </Routes>

//     </>

//   );

// };



// export default DashboardHomeRoute;


















import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../pages/admin/layout/Navbar";
import Dashboard from "../../pages/admin/dashboard/Dashboard";
import Categories from "../../pages/admin/dashboard/product/Categories";
import Category from "../../pages/admin/dashboard/category/Category";
import Order from "../../pages/admin/dashboard/order/Order";
import Coupon from "../../pages/admin/dashboard/coupon/Coupon";
import Banner from "../../pages/admin/dashboard/banner/Banner";
import Admin from "../../pages/admin/dashboard/admin-manage/Admin";
import Transaction from "../../pages/admin/dashboard/transaction/Transaction";
import Customer from "../../pages/admin/dashboard/customer-manage/Customer";
import UpdateProduct from "../../pages/admin/dashboard/product/UpdateProduct";
import Addcategory from "../../pages/admin/dashboard/product/Addcategory";
import Addproduct from "../../pages/admin/dashboard/product/Addproduct";
import Offer from "../../pages/admin/dashboard/offer/Offer";
import Login from "../../pages/admin/login/Login";
import AddAdmin from "../../pages/admin/login/AddAdmin";
import UpdateAdmin from "../../pages/admin/login/UpdateAdmin";
import Contact from "../../pages/admin/dashboard/contact/Contact";
import FeedBack from "../../pages/admin/dashboard/feedback/Feedback";
import VeiwProduct from "../../pages/admin/dashboard/product/VeiwProduct";
import UpdateCategory from "../../pages/admin/dashboard/category/UpdateCategory";

// Function to check if admin is logged in
const isAuthenticated = () => {
  return localStorage.getItem("admin_id") !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/admin/login" />;
};

const DashboardHomeRoute = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protect /admin route */}
      <Route path="/admin" element={<ProtectedRoute element={<Navbar />} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Add-Product" element={<Addproduct />} />
        <Route path="/admin/update-product" element={< UpdateProduct/>} />
        <Route path="/admin/update-category" element={<UpdateCategory />} />
        <Route path="/admin/Veiw-Product" element={<VeiwProduct />} />
        <Route path="add-category" element={<Addcategory />} />
        <Route path="products/Categories/:id" element={<Categories />} />
        <Route path="category" element={<Category />} />
        <Route path="order" element={<Order />} />
        <Route path="coupon" element={<Coupon />} />
        <Route path="banner" element={<Banner />} />
        <Route path="offer" element={<Offer />} />
        <Route path="admin-manage" element={<Admin />} />
        <Route path="feedback" element={<FeedBack />} />
        <Route path="add-admin" element={<AddAdmin />} />
        <Route path="update-admin" element={<UpdateAdmin />} />
        <Route path="contact" element={<Contact />} />
        <Route path="customer-manage" element={<Customer />} />
        <Route path="transaction" element={<Transaction />} />
      </Route>
    </Routes>
  );
};

export default DashboardHomeRoute;
