import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../category/listCategory/listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import DataTable from '../../../components/admin/datatable/DataTable';
import axios from 'axios';

const ListProduct = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [products, setProducts] = useState([])

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
   const getProducts = async () => {
      const response = await axios.get(`http://localhost:5000/admin/products`);
      setProducts(response.data);
   }

   useEffect(() => {
      getProducts();
   }, []);

   const deleteProduct = async (productId) => {
      await axios.delete(`http://localhost:5000/admin/products/${productId}`);
      getProducts();
   }

   //
   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={`${params.row.uuid}`} style={{ textDecoration: "none" }}>
                     <div className='viewButton'>View</div>
                  </Link>
                  <div onClick={() => deleteProduct(params.row.uuid)} style={{ textDecoration: "none" }}>
                     <div className='deleteButton'>Delete</div>
                  </div>
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
   { field: "id", headerName: "ID", width: 70 },
   {
      field: "danhmuc",
      headerName: "Danh mục",
      width: 100,
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
      width: 100,
      renderCell: (params) => {
         return (
            <div>
               {params.row.sub_category.name}
            </div>
         )
      }
   },
   {
      field: ' nameShop',
      headerName: "Shop",
      width: 120,
      renderCell: (params) => {
         return (
            <div>
               {params.row.seller.nameShop}
            </div>
         )
      }
   },
   {
      field: "name",
      headerName: "Sản phẩm",
      width: 200,
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
      width: 70,
   },
   {
      field: "discount",
      headerName: "Giảm(%)",
      width: 80
   },
   {
      field: "description",
      headerName: 'Mô tả',
      width: 150,
   },
   {
      field: 'createdAt',
      headerName: 'Thời gian',
      width: 150
   }

];

