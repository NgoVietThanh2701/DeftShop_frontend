import React, { useEffect } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./listUser.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';

const ListUser = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login");
      }
   }, [isError, navigate]);

   return (
      <div className='listUser'>
         <Sidebar />
         <div className="listUserContainer">
            <Navbar />
            users
         </div>
      </div>
   )
}

export default ListUser