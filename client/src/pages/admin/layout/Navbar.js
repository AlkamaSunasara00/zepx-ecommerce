import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet,useNavigate } from 'react-router-dom';
import '../../../assets/css/admin/layout/navbar.css';
import axios from "axios";

function Navbar() {
  const dropdownRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4800/getcategory");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const adminId = localStorage.getItem("admin_id");
      if (!adminId) {
        console.log("No admin ID found in localStorage!");
        navigate("/admin/login");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:4800/getadminbyid/${adminId}`);
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
  
    fetchAdminDetails();
  }, [navigate]);
  



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdowns = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("admin_id");
      localStorage.removeItem("isLoggedIn");
      navigate("/admin/login");
    }
  };
  

  return (
    <>
      <div className='main-container'>
        <div className='sub-aside-container'>
          <aside id='asidee'>
            <div className='sub-aside-logo'>
              <div className='aside-logo'>
                <img src={require('../../../assets/images/admin/logo.png')} alt="logo" />
              </div>
              <div className='aside-txt'>
                <p>zepX</p>
              </div>
            </div>
            <div className='main-aside'>
              <div className='menu-aside'>
                <div className='heading-menu'>
                  <p>MENU</p>
                </div>
                <div className='menu-list'>
                  <ul>
                    <NavLink to={'dashboard'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i className="fa-solid fa-list"></i>
                        <p>Dashboard</p>
                      </li>
                    </NavLink>
                    <li className='product1' onClick={toggleDropdown} id={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li className='product2' >
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <p>Products</p>
                      </li>
                    </li>


                    {isDropdownOpen && (
                      <div className='menu-list-products' ref={dropdownRef}>
                        <ul onClick={(e) => e.stopPropagation()}>
                          {categories.map((category) => (
                            <NavLink to={`products/Categories/${category.category_id}`}>
                              <li key={category.category_id} value={category.category_id}>
                                <p>{category.name}</p>
                              </li>
                            </NavLink>
                          ))}
                        </ul>
                      </div>
                    )}



                    <NavLink to={'category'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-layer-group"></i>
                        <p>Category</p>
                      </li>
                    </NavLink>
                    {/* <NavLink to={'order'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-box-open"></i>
                        <p>Orders</p>
                      </li>
                    </NavLink> */}
                    {/* <NavLink to={'coupon'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-ticket"></i>
                        <p>Coupon</p>
                      </li>
                    </NavLink> */}
                    <NavLink to={'banner'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-tag"></i>
                        <p>Banner</p>
                      </li>
                    </NavLink>
                    <NavLink to={'offer'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                      <i class="fa-solid fa-fire"></i>
                        <p>Offer</p>
                      </li>
                    </NavLink>
                    {/* <NavLink to={'transaction'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-wallet"></i>
                        <p>Transaction</p>
                      </li>
                    </NavLink> */}
                  </ul>
                </div>
              </div>
              <div className='user-aside'>
                <div className='heading-user'>
                  <p>User Managment</p>
                </div>
                <div className='user-list'>
                  <ul>
                    <NavLink to={'admin-manage'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-user-tie"></i>
                        <p>Manage Admins</p>
                      </li>
                    </NavLink>
                    <NavLink to={'customer-manage'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                        <i class="fa-solid fa-users"></i>
                        <p>Customers</p>
                      </li>
                    </NavLink>
                    <NavLink to={'contact'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                      <i class="fa-solid fa-address-card"></i>
                        <p>Contact</p>
                      </li>
                    </NavLink>
                    <NavLink to={'feedback'} className={({ isActive }) => isActive ? 'active-link' : ''}>
                      <li>
                      <i class="fa-solid fa-address-card"></i>
                        <p>feedback</p>
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </div>
              <div className='setting-aside'>
                <div className='heading-setting'>
                  <p>User Managment</p>
                </div>
                <div className='setting-list'>
                  <ul>
                  <li>
                      <i class="fa-solid fa-gear"></i>
                      <p>Settings</p>
                    </li>
                    <li>
                      <i class="fa-solid fa-circle-info"></i>
                      <p>Help</p>
                    </li>
                    <li id='logout' onClick={handleLogout}>
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          <main id='main'>
            <nav id='nav'>
              <div className='main-nav'>
                <div className='searchbar'>
                  <div className='sub-searchbar'>
                    <input type='search' placeholder='Search...' />
                  </div>
                  <div className='searchbar-icon'>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
                <div className='bell-icon'>
                  <i class="fa-solid fa-bell"></i>
                </div>
                <div className='about-admin'>
                  <div className='sub-about-admin-img'>
                  {admin ? (
                      // <img src={`http://localhost:4800/uploads/${admin.image}`} alt="user" />
                      <img src={`/uploads/${admin.img}`} alt={admin.username} />
                    ) : (
                      <img src={require("../../../assets/images/profile.jpg")} alt="user" />
                    )}
                  </div>
                  <div className='sub-about-admin-txt'>
                  <div><p>{admin ? admin.username : "Loading..."}</p></div>
                  <div><b>{admin ? admin.role : "Loading..."}</b></div>
                  </div>
                </div>
              </div>
            </nav>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default Navbar
