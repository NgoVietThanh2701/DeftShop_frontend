import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import "../product/newProduct/newProduct.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import noImage from '../../../images/no-image.png'
import axios from 'axios';

const UpdateProduct = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const { id } = useParams();

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
   const [preview, setPreview] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [nameShop, setNameShop] = useState("");
   const [address, setAddress] = useState("");
   const [msg, setMessage] = useState("");

   useEffect(() => {
      const getProfile = async () => {
         const response = await axios.get(`http://localhost:5000/admin/me`);
         setFile(response.data.user.image);
         setPreview(response.data.user.url);
         setName(response.data.user.name);
         setDescription(response.data.description);
         setNameShop(response.data.nameShop);
         setAddress(response.data.address);
      }
      getProfile();
   }, [id])

   const loadImage = (e) => {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image));
   };


   const updateProfile = async (event) => {
      // stopping reload page when submit
      event.preventDefault();
      const formData = new FormData();
      formData.append("nameShop", nameShop);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("name", name);
      formData.append("file", file);
      try {
         await axios.patch(`http://localhost:5000/admin/update-seller/${id}`, formData, {
            headers: {
               "Content-type": "multipart/form-data",
            }
         });
         navigate(`/admin/profile`);
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
               Cập nhập thông tin
            </div>
            <div className="bottom-new">
               <div className="left">
                  <img
                     src={preview ?? noImage}
                     alt="" />
               </div>
               <div className="right">
                  <form onSubmit={updateProfile}>
                     <div className="formInput">
                        <label htmlFor='file'>
                           Image: <DriveFolderUploadOutlined className='icon' />
                        </label>
                        <input type="file" id='file'
                           style={{ display: "none" }}
                           onChange={loadImage} />
                     </div>
                     <div className="formInput">
                        <label>Name Shop</label>
                        <input type='text' placeholder='name'
                           value={nameShop}
                           onChange={(e) => setNameShop(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Name</label>
                        <input type='text' placeholder='name'
                           value={name}
                           onChange={(e) => setName(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Address</label>
                        <input type='text' placeholder='description'
                           value={address}
                           onChange={(e) => setAddress(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Description</label>
                        <input type='text' placeholder='description'
                           value={description}
                           onChange={(e) => setDescription(e.target.value)} />
                     </div>
                     <p style={{ color: 'red' }}>{msg}</p>
                     <button type='submit' className='addProductButton'>
                        Update
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default UpdateProduct