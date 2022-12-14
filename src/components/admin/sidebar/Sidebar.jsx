import React from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
// import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAdmin, reset } from "../../../features/admin/authSlice";

const Sidebar = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { admin } = useSelector((state) => state.auth);

   const logout = () => {
      dispatch(logOutAdmin());
      dispatch(reset());
      navigate("/admin/login");
   }

   return (
      <div className='sidebar'>
         <div className="top">
            <NavLink to="/admin" style={{ textDecoration: "none" }}>
               <span className='logo'>DeftShop</span>
            </NavLink>
         </div>
         <hr />
         <div className="center">
            <ul>
               <p className="title">MAIN</p>
               <NavLink to="/admin" style={{ textDecoration: "none" }}>
                  <li>
                     <DashboardIcon className='icon' />
                     <span>Dashboard</span>
                  </li>
               </NavLink>
               <p className="title">LIST</p>
               {(admin && (!admin.role || (admin.role && admin.role === 'admin'))) &&
                  <NavLink to="/admin/category" style={{ textDecoration: "none" }}>
                     <li>
                        <PersonOutlineOutlinedIcon className='icon' />
                        <span>Category</span>
                     </li>
                  </NavLink>
               }

               {(admin && (!admin.role || (admin.role && admin.role === 'admin'))) &&
                  <NavLink to="/admin/products" style={{ textDecoration: "none" }}>
                     <li>
                        <StoreOutlinedIcon className='icon' />
                        <span>Products</span>
                     </li>
                  </NavLink>
               }

               {(admin && admin.role === 'admin') &&
                  <NavLink to="/admin/sellers" style={{ textDecoration: "none" }}>
                     <li>
                        <CreditCardOutlinedIcon className='icon' />
                        <span>Sellers</span>
                     </li>
                  </NavLink>
               }

               {(admin && (!admin.role || (admin.role && admin.role === 'admin'))) &&
                  <NavLink to="/admin/users" style={{ textDecoration: "none" }}>
                     <li>
                        <LocalShippingOutlinedIcon className='icon' />
                        <span>Users</span>
                     </li>
                  </NavLink>
               }

               <p className="title">USEFUL</p>
               {(admin && admin.role === 'admin') &&
                  <NavLink to="/admin/notify" style={{ textDecoration: "none" }}>
                     <li>
                        <NotificationsActiveOutlinedIcon className='icon' />
                        <span>Request</span>
                     </li>
                  </NavLink>
               }

               <p className="title">USER</p>
               <NavLink to="/admin/profile" style={{ textDecoration: "none" }}>
                  <li>
                     <NotificationsActiveOutlinedIcon className='icon' />
                     <span>Profile</span>
                  </li>
               </NavLink>
               <li>
                  <NotificationsActiveOutlinedIcon className='icon' />
                  <span onClick={logout}>Logout</span>
               </li>
            </ul>
         </div>
         <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
         </div>
      </div >
   )
}

export default Sidebar