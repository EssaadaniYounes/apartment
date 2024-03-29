import React from 'react'
import DataTable from 'react-data-table-component';
const paginationComponentOptions = {
  rowsPerPageText: 'Nombre de lignes par page',
    rangeSeparatorText: '/',
    selectAllRowsItem: true,
  selectAllRowsItemText: 'Tous',
};
function CustomDataTable({ columns, data }) {
  
  return (
      <DataTable highlightOnHover columns={columns} data={data} pagination paginationComponentOptions={paginationComponentOptions}/>
  )
}

export default CustomDataTable