import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Chart from '../../../components/admin/chart/Chart'
import './profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [profile, setProfile] = useState([]);

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login");
      }
   }, [isError, navigate]);

   //
   useEffect(() => {
      getProfile();
   }, []);

   const getProfile = async () => {
      const response = await axios.get('http://localhost:5000/admin/me')
      setProfile(response.data)
   }

   return (
      <div className='profile'>
         <Sidebar />
         <div className="profileContainer">
            <Navbar />
            <div className="top">
               <div className="left">
                  {(profile && profile.user) ? <Link to={`./update/${profile.id}`} className="editButton"><EditIcon /></Link> : ''}
                  <h1 className="title-info">Information</h1>
                  <div className="item">
                     <img
                        src={(profile && profile.user) ? profile.user.url : profile.url}
                        alt=""
                        className="itemImg"
                     />
                     {profile && !profile.user ?
                        <div className="details">
                           <h1 className="itemTitle">{profile.name}</h1>
                           <div className="detailItem">
                              <span className="itemKey">Email:</span>
                              <span className="itemValue">{profile.email} </span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Role:</span>
                              <span className="itemValue">{profile.role}</span>
                           </div>
                        </div>
                        :
                        <div className="details">
                           <h1 className="itemTitle">{profile.nameShop}</h1>
                           <div className="detailItem">
                              <span className="itemKey">{profile.user.name}</span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Địa chỉ:</span>
                              <span className="itemValue">{profile.address} </span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Mô tả:</span>
                              <span className="itemValue">{profile.description}</span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Điện thoại:</span>
                              <span className="itemValue">{profile.user.phone}</span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Email:</span>
                              <span className="itemValue">{profile.user.phone}</span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Tham gia:</span>
                              <span className="itemValue">{profile.createdAt}</span>
                           </div>
                        </div>}
                  </div>
               </div>
               <div className="right">
                  <Chart aspect={2 / 1} title="Thời gian sủ dụng trong tuần" />
               </div>

            </div>
         </div>
      </div >
   )
}

export default Profile