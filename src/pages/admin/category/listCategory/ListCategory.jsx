import React, { useEffect, useState } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';
import DataTable from '../../../../components/admin/datatable/DataTable';
import axios from 'axios';


const ListCategory = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [category, setCategory] = useState([]);

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login")
      }
   }, [isError, navigate]);

   // get category
   useEffect(() => {
      getCategory();
   }, []);

   const getCategory = async () => {
      const response = await axios.get('http://localhost:5000/admin/category');
      setCategory(response.data);
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
      <div className='listCategory'>
         <Sidebar />
         <div className="listCategoryContainer">
            <Navbar />
            <DataTable
               userRows={category}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="danh mục" />
         </div>
      </div>
   )
}

export default ListCategory;

const userColumns = [
   { field: "id", headerName: "ID", width: 120 },
   {
      field: "name",
      headerName: "Danh mục",
      width: 250,
   },
   {
      field: "manager",
      headerName: "Người tạo",
      width: 250,
      renderCell: (params) => {
         return (
            <div className=''>
               {params.row.manager.name}
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

