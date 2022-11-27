import React, { useState, useEffect } from 'react'
import './login.css'
import fb from '../../../images/fb.png';
import twitter from '../../../images/twitter.png';
import google from '../../../images/google.png';
import loading from '../../../images/loading.gif'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginAdmin, reset } from '../../../features/admin/authSlice';

const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { admin, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.auth
   );
   useEffect(() => {
      if (admin || isSuccess) {
         navigate("/admin");
      }
      dispatch(reset());
   }, [admin, isSuccess, dispatch, navigate]);

   const Auth = (e) => {
      e.preventDefault();
      dispatch(loginAdmin({ email, password }));
   }

   return (
      <div className="main-wrap">
         <div className="box-container">
            <div className="img-box">
            </div>
            <div className="form-wrap">
               <div className="top-signup">
                  <span>Don't you have an account?</span>
                  <NavLink className="signup-btn">SIGN UP</NavLink>
               </div>
               <div className="mid-container">
                  <h1>Welcome Back</h1>
                  <h6>Login your Account</h6>
                  {isError && <span style={{ color: 'red' }}>{message}</span>}
                  <form onSubmit={Auth} className="form">                        <label htmlFor="Username">Email</label><br />
                     <input type="email" name="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                     <br /><br />
                     <label htmlFor="Password">Password</label><br />
                     <input type="password" name="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                     <br />
                     <span><NavLink className="fg-pass">Forgot password?</NavLink></span>
                     <br />
                     {isLoading ?
                        <img className='image-loading' src={loading} alt='' />
                        :
                        <button type="submit" className="login-btn">Login
                        </button>
                     }
                  </form>
               </div>
               <div className="login-with">
                  <span>Login with</span>
                  <a href><img src={fb} alt="fb" /></a>
                  <a href><img src={google} alt="google" /></a>
                  <a href><img src={twitter} alt="twitter" /></a>
               </div>
            </div>
         </div>
      </div>

   )
}

export default Login