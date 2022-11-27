import React, { useEffect, useState } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./listProduct.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';
import DataTable from '../../../../components/admin/datatable/DataTable';
import axios from 'axios';

const ListProduct = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [products, setProducts] = useState([])
   const { id, subId } = useParams();

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login");
      }
   }, [isError, navigate]);

   // get products
   useEffect(() => {
      const getProducts = async () => {
         const response = await axios.get(`http://localhost:5000/admin/category/${id}/${subId}`);
         setProducts(response.data);
         console.log(response.data);
      }
      getProducts();
   }, [id, setProducts, subId]);

   //
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
      <div className='listProduct'>
         <Sidebar />
         <div className="listProductContainer">
            <Navbar />
            <DataTable
               userRows={products}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="sản phẩm" />
         </div>
      </div>
   )
}

export default ListProduct

const userColumns = [
   { field: "id", headerName: "ID", width: 60 },
   {
      field: "danhmuc",
      headerName: "Danh mục",
      width: 120,
      renderCell: (params) => {
         return (
            <div>
               {params.row.category.name}
            </div>
         )
      }
   },
   {
      field: "loai",
      headerName: "Loại",
      width: 120,
      renderCell: (params) => {
         return (
            <div>
               {params.row.sub_category.name}
            </div>
         )
      }
   },
   {
      field: "name",
      headerName: "Sản phẩm",
      width: 220,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.url} alt="avatar" />
               {params.row.name}
            </div>
         )
      }
   },
   {
      field: "price",
      headerName: "Giá",
      width: 100,
   },
   {
      field: "description",
      headerName: 'Mô tả',
      width: 450,
   },

];

