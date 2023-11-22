import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import PropTypes from 'prop-types';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Grid = ({ isAdmin, adminRowData, empRowData }) => {
  const gridRef = useRef();

  const dateFormatter = (params) => {
  const dateAsString = params.data.workWeek;
  const dateParts = dateAsString.split('-');
  return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
  }

  const [columnDefs] = useState([
    { headerName: "First Name", field: "firstName", resizable: true },
    { headerNane: "Last Name", field: "lastName", resizable: true },
    { headerName: "Email", field: 'email', resizable: true },
    { headerName: "Username", field: 'userName', resizable: true },
    { headerName: "Contract", field: 'contract', resizable: true },
    { headerName: "Task Name", field: 'taskName', resizable: true },
    { headerName: "Hours", field: 'hours', resizable: true},
    { headerName: "Work Week", field: 'workWeek', resizable: true, valueFormatter: dateFormatter,},
    { headerName: "Description", field: 'description', resizable: true },
  ]);

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    filterParams: { buttons: ['reset'] },
    flex: 1,
  };
  

  return (
    <div className="ag-theme-alpine" style={{
      height: '57vh', overflow: 'hidden', width: 'auto', margin: '10px',
    }}>
      <AgGridReact
        ref={gridRef}
        rowData={isAdmin ? adminRowData : empRowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef} 
        rowSelection="single"
        pagination
        paginationPageSize={10}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
};

export default Grid;

Grid.propTypes = {
  isAdmin: PropTypes.bool,
  adminRowData: PropTypes.array,
  empRowData: PropTypes.array
}