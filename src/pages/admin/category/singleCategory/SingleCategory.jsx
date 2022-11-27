import React, { useEffect, useState } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./singleCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';
import DataTable from '../../../../components/admin/datatable/DataTable';
import axios from 'axios';

const SingleCategory = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [subCategory, setSubCategory] = useState([]);
   const { id } = useParams();

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
      const getSubCategory = async () => {
         const response = await axios.get(`http://localhost:5000/admin/category/${id}`);
         setSubCategory(response.data);
      }
      getSubCategory();
   }, [id]);

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
      <div className='singleCategory'>
         <Sidebar />
         <div className="singleCategoryContainer">
            <Navbar />
            <DataTable
               userRows={subCategory}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="loại" />
         </div>
      </div>
   )
}

export default SingleCategory;

const userColumns = [
   { field: "id", headerName: "ID", width: 120 },
   {
      field: "danhmuc",
      headerName: "Danh mục",
      width: 200,
      renderCell: (params) => {
         return (
            <div>
               {params.row.category.name}
            </div>
         )
      }
   },
   {
      field: "name",
      headerName: "Loại",
      width: 200,
   },
   {
      field: "seller",
      headerName: "Người tạo",
      width: 150,
      renderCell: (params) => {
         return (
            <div className=''>
               {params.row.seller.name}
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

