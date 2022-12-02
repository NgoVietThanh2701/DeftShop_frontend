import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
   },
}));

function BootstrapDialogTitle(props) {
   const { children, onClose, ...other } = props;

   return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
         {children}
         {onClose ? (
            <IconButton
               aria-label="close"
               onClick={onClose}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
               }}
            >
               <CloseIcon />
            </IconButton>
         ) : null}
      </DialogTitle>
   );
}

BootstrapDialogTitle.propTypes = {
   children: PropTypes.node,
   onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ title, id, idSub, checkType, CallbackUpdate }) {
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   // create category
   const [name, setName] = useState("");
   const [msg, setMsg] = useState("");

   const create = async () => {
      await axios.post(id ? `http://localhost:5000/admin/category/${id}` : "http://localhost:5000/admin/category", {
         name: name,
      });
      CallbackUpdate();
   }

   const update = async () => {
      await axios.patch(idSub ? `http://localhost:5000/admin/category/${id}/${idSub}` : `http://localhost:5000/admin/category/${id}`, {
         name: name,
      })
   }


   const SaveCategory = async (event) => {
      event.preventDefault();
      try {
         checkType ? create() : (id && update())
         setName("");
         //window.location.reload(false);
      } catch (error) {
         if (error.response) {
            setMsg(error.response.data.msg);
         }
      }
   }

   return (
      <div>
         <div
            onClick={handleClickOpen}
            style={{
               textDecoration: checkType ? 'none' : '',
               color: 'green',
               fontSize: checkType ? '16px' : '',
               border: checkType ? '1px solid green' : '',
               padding: checkType ? '5px' : '',
               borderRadius: checkType ? '5px' : '',
               cursor: 'pointer',
               marginRight: checkType ? '15px' : '',
               marginTop: checkType ? '5px' : '',
            }}>
            {checkType ? "Add new" : "Update"}
         </div>
         <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
               Thêm {title} sản phẩm
            </BootstrapDialogTitle>
            <DialogContent dividers>
               <form style={{
                  display: 'flex',
                  flexDirection: 'column',
               }} onSubmit={SaveCategory}>
                  <p>{msg}</p>
                  <label className='label'
                     style={{
                        fontWeight: '500',
                     }}>
                     Name
                  </label>
                  <input type="text" name="name"
                     placeholder="Danh mục"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     autoFocus
                     style={{
                        width: '270px',
                        margin: '10px 0px',
                        height: '33px',
                        color: 'rgb(155, 152, 152)',
                        paddingLeft: '5px',
                        borderRadius: '5px',
                        border: '1px solid rgb(216, 215, 215)',
                     }} />
                  <br />
                  <button type="submit"
                     onClick={handleClose}
                     style={{
                        textAlign: 'center',
                        padding: '7px',
                        cursor: 'pointer',
                        width: '100px',
                        fontSize: '16px',
                        backgroundColor: 'rgb(77, 121, 255)',
                        color: 'rgb(247,244,244)',
                        borderRadius: '10px',
                        border: 'none',
                        marginLeft: '30%'
                     }}
                  >{checkType ? 'Create' : 'Update'}
                  </button>
               </form>
            </DialogContent>
         </BootstrapDialog>
      </div >
   );
}
