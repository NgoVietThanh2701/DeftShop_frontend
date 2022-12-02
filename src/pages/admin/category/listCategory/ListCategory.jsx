import React, { useEffect, useState } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./listCategory.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';
import DataTable from '../../../../components/admin/datatable/DataTable';
import axios from 'axios';
import FormDialog from '../../../../components/admin/formDialog/FormDialog'

const ListCategory = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError, admin } = useSelector((state) => state.auth);
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
   const getCategory = async () => {
      const response = await axios.get('http://localhost:5000/admin/category');
      setCategory(response.data);
   }

   useEffect(() => {
      getCategory();
   }, []);


   //delete
   const deleteCategory = async (categoryId) => {
      await axios.delete(`http://localhost:5000/admin/category/${categoryId}`);
      getCategory();
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
                  {admin && admin.role &&
                     <div style={{ textDecoration: "none" }}>
                        <div className='updateButton'>
                           <FormDialog title="Update" id={params.row.uuid} checkType={false} />
                        </div>
                     </div>}

                  {admin && admin.role &&
                     <div onClick={() => deleteCategory(params.row.uuid)} style={{ textDecoration: "none" }}>
                        <div className='deleteButton'>Delete</div>
                     </div>}
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
               userRows={category}
               userColumns={userColumns}
               actionColumn={actionColumn}
               title="Danh mục"
               // checkNew={(admin && admin.role) ? true : false}
               isOpenDialog={(admin && admin.role) && true}
               checkType={true}
               CallbackUpdate={getCategory}
            />
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
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.manager.url} alt="avatar" style={{ width: "40px", height: "40px" }} />
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

