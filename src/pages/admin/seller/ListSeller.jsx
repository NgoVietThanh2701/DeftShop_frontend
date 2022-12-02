import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../category/listCategory/listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import DataTable from '../../../components/admin/datatable/DataTable';
import axios from 'axios';
import avatar from '../../../images/avatar.jpg';

const ListSeller = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [sellers, setSellers] = useState([]);

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login");
      }
   }, [isError, navigate]);

   // get users
   useEffect(() => {
      getUsers();
   }, []);

   const getUsers = async () => {
      const response = await axios.get('http://localhost:5000/admin/seller')
      setSellers(response.data)
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 150,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={`${params.row.uuid}`} style={{ textDecoration: "none" }}>
                     <div className='viewButton'>View</div>
                  </Link>
                  <div className='deleteButton'>Delete</div>
               </div >
            )
         }
      }
   ]

   return (
      <div className='list'>
         <Sidebar />
         <div className="listContainer">
            <Navbar />
            <DataTable
               userRows={sellers}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="người bán hàng" />
         </div>
      </div>
   )
}

export default ListSeller

const userColumns = [
   { field: "id", headerName: "ID", width: 40 },
   {
      field: "name",
      headerName: "Tên",
      width: 170,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.user.url ?? avatar} alt="avatar" />
               {params.row.user.name}
            </div>
         )
      }
   },
   {
      field: "phone",
      headerName: "Số điện thoại",
      width: 120,
      renderCell: (params) => {
         return (
            <div>
               {params.row.user.phone}
            </div>
         )
      }
   },
   {
      field: "email",
      headerName: "Email",
      width: 160,
      renderCell: (params) => {
         return (
            <div>
               {params.row.user.email}
            </div>
         )
      }
   },
   {
      field: "nameShop",
      headerName: "Shop",
      width: 150
   },
   {
      field: "address",
      headerName: "Địa chỉ",
      width: 120
   },
   {
      field: "description",
      headerName: "Giới thiệu",
      width: 220
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 120,
   },
];