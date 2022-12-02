import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../category/listCategory/listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import DataTable from '../../../components/admin/datatable/DataTable';
import axios from 'axios';
import FormDialog from '../../../components/admin/formDialog/FormDialog'

const SingleCategory = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError, admin } = useSelector((state) => state.auth);
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
   const getSubCategory = useCallback(async () => {
      const response = await axios.get(`http://localhost:5000/admin/category/${id}`);
      setSubCategory(response.data);
   }, [id]);


   useEffect(() => {
      getSubCategory();
   }, [getSubCategory]);

   //delete
   const deleteCategory = async (subCategoryId) => {
      await axios.delete(`http://localhost:5000/admin/category/${id}/${subCategoryId}`);
      getSubCategory();
   }

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
                  {admin && !admin.role &&
                     <div style={{ textDecoration: "none" }}>
                        <div className='updateButton'>
                           <FormDialog title="Update" idSub={params.row.uuid} id={id} checkType={false} />
                        </div>
                     </div>}

                  <div onClick={() => deleteCategory(params.row.uuid)} style={{ textDecoration: "none" }}>
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
               userRows={subCategory}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="loại"
               //checkNew={(admin && admin.role) ? false : true} 
               isOpenDialog={(admin && !admin.role) && true}
               id={id}
               checkType={true}
               CallbackUpdate={getSubCategory}
            />
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
               {params.row.seller.id} | {params.row.seller.nameShop}
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

