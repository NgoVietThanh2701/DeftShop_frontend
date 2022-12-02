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

const ListUser = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [users, setUsers] = useState([]);

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
      const response = await axios.get('http://localhost:5000/admin/user')
      setUsers(response.data)
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 170,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={`./${params.row.uuid}`} style={{ textDecoration: "none" }}>
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
               userRows={users}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="người dùng" />
         </div>
      </div>
   )
}

export default ListUser

const userColumns = [
   { field: "id", headerName: "ID", width: 80 },
   {
      field: "name",
      headerName: "Tên",
      width: 230,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.url ?? avatar} alt="avatar" />
               {params.row.name}
            </div>
         )
      }
   },
   {
      field: "phone",
      headerName: "Số điện thoại",
      width: 150,
   },
   {
      field: "email",
      headerName: "Email",
      width: 200,
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 250,
   },
];