import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../category/listCategory/listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import DataTable from '../../../components/admin/datatable/DataTable';
import axios from 'axios';
import { useCallback } from 'react';

const ListProductBySubCa = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError, admin } = useSelector((state) => state.auth);
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
   const getProducts = useCallback(async () => {
      const response = await axios.get(`http://localhost:5000/admin/category/${id}/${subId}`);
      setProducts(response.data);
   }, [id, subId])

   useEffect(() => {
      getProducts();
   }, [getProducts]);

   // delete product
   const deleteProduct = async (productId) => {
      await axios.delete(`http://localhost:5000/admin/category/${id}/${subId}/${productId}`);
      getProducts();
   }


   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 210,
         renderCell: (params) => {
            return (
               <div className='cellAction' key={params.row.id}>
                  <Link to={``} style={{ textDecoration: "none" }}>
                     <div className='viewButton'>View</div>
                  </Link>
                  {admin && !admin.role &&
                     <Link to={`./${params.row.uuid}/update`} style={{ textDecoration: "none" }}>
                        <div className='updateButton'>Update</div>
                     </Link>}
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
               title="sản phẩm"
               checkNew={(admin && admin.role) ? false : true} />
         </div>
      </div>
   )
}

export default ListProductBySubCa

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
      field: 'nameShop',
      headerName: "Shop",
      width: 110,
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
      width: 80,
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
      field: "createdAt",
      headerName: "Thời gian",
      width: 130
   }

];

