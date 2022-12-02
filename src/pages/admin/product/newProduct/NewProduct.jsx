import React, { useEffect, useState } from 'react'
import Navbar from '../../../../components/admin/navbar/Navbar';
import Sidebar from '../../../../components/admin/sidebar/Sidebar';
import "./newProduct.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../../features/admin/authSlice';
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import noImage from '../../../../images/no-image.png'
import axios from 'axios';

const NewProduct = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
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

   const [file, setFile] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [discount, setDiscount] = useState("")
   const [msg, setMessage] = useState("");


   const saveProduct = async (event) => {
      // stopping reload page when submit
      event.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("file", file)
      try {
         if (name === '') {
            setMessage("Vui lòng nhập tên sản phẩm!");
         } else if (description === '') {
            setMessage("Vui lòng nhập mô tả sản phẩm!");
         } else if (price === '') {
            setMessage("Vui lòng nhập giá sản phẩm!");
         } else {
            await axios.post(`http://localhost:5000/admin/category/${id}/${subId}`, formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            navigate(`/admin/category/${id}/${subId}`);
         }
      } catch (error) {
         if (error) {
            setMessage(error.response.data.msg)
         }
      }
   }


   return (
      <div className='newProduct'>
         <Sidebar />
         <div className="newProductContainer">
            <Navbar />
            <div className="top-new">
               Thêm sản phẩm
            </div>
            <div className="bottom-new">
               <div className="left">
                  <img
                     src={file ? URL.createObjectURL(file) : noImage}
                     alt="" />
               </div>
               <div className="right">
                  <form onSubmit={saveProduct}>
                     <div className="formInput">
                        <label htmlFor='file'>
                           Image: <DriveFolderUploadOutlined className='icon' />
                        </label>
                        <input type="file" id='file'
                           style={{ display: "none" }}
                           onChange={e => setFile(e.target.files[0])} />
                     </div>
                     <div className="formInput">
                        <label>Name</label>
                        <input type='text' placeholder='name'
                           value={name}
                           onChange={(e) => setName(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Description</label>
                        <input type='text' placeholder='description'
                           value={description}
                           onChange={(e) => setDescription(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Price</label>
                        <input type='text' placeholder='price'
                           value={price}
                           onChange={(e) => setPrice(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Discount</label>
                        <input type='text' placeholder='discount'
                           value={discount}
                           onChange={(e) => setDiscount(e.target.value)} />
                     </div>
                     <p style={{ color: 'red' }}>{msg}</p>
                     <button type='submit' className='addProductButton'>
                        Create
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewProduct