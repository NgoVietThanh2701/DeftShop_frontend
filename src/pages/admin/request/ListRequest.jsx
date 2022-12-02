import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../category/listCategory/listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import DataTable from '../../../components/admin/datatable/DataTable';
import axios from 'axios';

const ListRequest = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [request, setRequest] = useState([]);

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
      getNotify();
   }, []);

   const getNotify = async () => {
      const response = await axios.get('http://localhost:5000/admin/notify')
      setRequest(response.data)
   }

   const AllowSeller = async (id) => {
      await axios.patch(`http://localhost:5000/admin/seller/${id}`);
      getNotify();
   }


   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 150,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <div onClick={() => AllowSeller(params.row.user.id)} style={{ textDecoration: "none" }}>
                     <div className='updateButton'>Allow</div>
                  </div>
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
               userRows={request}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="yêu cầu" />
         </div>
      </div>
   )
}

export default ListRequest

const userColumns = [
   { field: "id", headerName: "ID", width: 80 },
   {
      field: "title",
      headerName: "Loại",
      width: 150,
   },
   {
      field: "content",
      headerName: "Nội dung",
      width: 250,
   },
   {
      field: "user-from",
      headerName: "Người gửi",
      width: 230,
      renderCell: (params) => {
         return (
            <div>
               {params.row.user.name} ~ {params.row.user.email}
            </div>
         )
      }
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 250,
   },
];