import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './dataTable.scss'
import FormDialog from '../formDialog/FormDialog'

const DataTable = ({ userRows, userColumns, actionColumn,
   title, checkNew, isOpenDialog, id, checkType, CallbackUpdate }) => {

   return (
      <div className='data-table'>
         <div className='data-table-title'>
            Danh sách {title}
            {checkNew && <Link to='./new-product' className='link' > Add new</Link>}
            {isOpenDialog && <FormDialog title={title} checkType={checkType} id={id} CallbackUpdate={CallbackUpdate} />}
         </div>

         <DataGrid
            style={{ paddingLeft: "10px" }}
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={60}
         />
      </div>
   )
}

export default DataTable