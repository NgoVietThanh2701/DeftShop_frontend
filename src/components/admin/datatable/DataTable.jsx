import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import './dataTable.scss'

const DataTable = ({ userRows, userColumns, actionColumn, title }) => {


   return (
      <div className='data-table'>
         <div className='data-table-title'>
            Danh sách {title}
            <Link className='link'>Add new</Link>
         </div>
         <DataGrid
            style={{ paddingLeft: "10px" }}
            rows={userRows}
            columns={userColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight="60px"
         />
      </div>
   )
}

export default DataTable