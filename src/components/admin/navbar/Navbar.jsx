import React from 'react'
import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useSelector } from 'react-redux'
import avatar from '../../../images/avatar.jpg'

const Navbar = () => {

   const { admin } = useSelector((state) => state.auth);

   return (
      <div className='navbar'>
         <div className="wrapper">
            <div className="search">
               <input type="text" placeholder='Search...' />
               <SearchOutlinedIcon />
            </div>
            <div className="items">
               <div className="item">
                  <LanguageOutlinedIcon className='icon' />
                  English
               </div>
               <div className="item">
                  <DarkModeOutlinedIcon className='icon' />
               </div>
               <div className="item">
                  <FullscreenExitOutlinedIcon className='icon' />
               </div>
               <div className="item">
                  <NotificationsNoneOutlinedIcon className='icon' />
                  <div className="counter">1</div>
               </div>
               <div className="item">
                  <ChatBubbleOutlineOutlinedIcon className='icon' />
                  <div className="counter">1</div>
               </div>
               <div className="item">
                  <ListOutlinedIcon className='icon' />
               </div>
               <div className="item" style={{ fontWeight: 700 }}>
                  {admin && admin.role && admin.name}
                  {admin && !admin.role && admin.user.name}
                  <img
                     src={(admin && admin.role) ?
                        (admin.url !== null ? admin.url : avatar) :
                        ((admin && admin.user.url !== null) ? admin.user.url : avatar)
                     }
                     alt=''
                     className='avatar' />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Navbar