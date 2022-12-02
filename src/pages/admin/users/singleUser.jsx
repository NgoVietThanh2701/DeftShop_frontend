import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Chart from '../../../components/admin/chart/Chart'
import '../../../pages/admin/profile/profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMeAdmin } from '../../../features/admin/authSlice';
import axios from 'axios'

const SingleUser = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [user, setUser] = useState([]);
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

   //
   useEffect(() => {
      const getUserById = async () => {
         const response = await axios.get(`http://localhost:5000/admin/user/${id}`)
         setUser(response.data)
      }
      getUserById();
   }, [id]);


   return (
      <div className='profile'>
         <Sidebar />
         <div className="profileContainer">
            <Navbar />
            <div className="top">
               <div className="left">
                  <h1 className="title-info">Information</h1>
                  <div className="item">
                     <img
                        src={user && user.url}
                        alt=""
                        className="itemImg"
                     />
                     {user &&
                        <div className="details">
                           <h1 className="itemTitle">{user.name}</h1>
                           <div className="detailItem">
                              <span className="itemKey" style={{ fontSize: '20px' }}>Email:</span>
                              <span className="itemKey" style={{ fontSize: '20px' }}>{user.email}</span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Phone:</span>
                              <span className="itemValue">{user.phone} </span>
                           </div>
                           <div className="detailItem">
                              <span className="itemKey">Tham gia:</span>
                              <span className="itemValue">{user.createdAt}</span>
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

export default SingleUser