import { useState } from "react";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { GridColumnMenuSort, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { orderBy, filterBy } from "@progress/kendo-data-query";
import { employees } from '../../mocks/employees';
import './grid.css'
import { CommandCell } from "./CustomCells/CommandCell";

const ReportGrid = () => {
  const DATA_ITEM_KEY = "id";
  const editField = "inEdit";
  const initialDataState = {
    take: 10,
    skip: 0,
    group: [],
  };

  const initialSort = [
    {
      field: "id",
      dir: "desc",
    },
  ];

  const initialFilter = {
    logic: "and",
    filters: [
      {
        field: "",
        operator: "",
        value: "",
      },
    ],
  };

  const [data, setData] = useState(employees);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter);

  const handleSortChange = (sortObj) => {
    setSort(sortObj);
    setData(orderBy(data, sortObj))
  }

  const handleFilterChange = (filterObj) => {
    setFilter(filterObj);
    setData(filterBy(data, filterObj))
  }

  const dataStateChange = event => {
    // in case we need to set data?
    console.log(event);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      // Discontinued: false
      firstName: 'Tom',
      lastName: 'Smith'
    };
    setData([newDataItem, ...data]);
  };


  const ColumnMenu = props => {
    return <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter {...props} />
      </div>;
  };

  const commandCellFn = props => <CommandCell editField={editField} {...props}/>;

  return (
    <div>
      <Grid style={{
        height: 'auto'
      }} pageable={{
        pageSizes: true
      }} 
      data={data}
      sortable={true}
      sort={sort}
      onSortChange={(e) => {
        handleSortChange(e.sort)
      }}
      filter={filter}
      onFilterChange={(e) => {
        handleFilterChange(e.filter)
      }}
      total={data.count} 
      onDataStateChange={dataStateChange} 
      {...initialDataState}  
      dataItemKey={DATA_ITEM_KEY}
      editField={editField}
      >
        <Column field="firstName" title="First Name" columnMenu={ColumnMenu} width="250px" editable={false} />
        <Column field="lastName" title="Last Name" columnMenu={ColumnMenu} width="220px" editable={false} />
        <Column field="contract" title="Contract" columnMenu={ColumnMenu} width="220px" />
        <Column field="taskName" title="Task Name" columnMenu={ColumnMenu} width="220px" />
        <Column field="hours" title="Hours" columnMenu={ColumnMenu} width="220px" editor="numeric" />
        <Column field="workWeek" title="Work Week" columnMenu={ColumnMenu} width="220px" editor="date" format="{0:d}" />
        <Column field="description" title="Description" columnMenu={ColumnMenu} width="300px" />
        <Column title="Commands" cell={commandCellFn} width="300px" />
      </Grid>
      <button
        className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-5 mr-3 float-right"
        type="button"
        onClick={() => {addNew()}}
      >
        Add new
      </button>
    </div>
  )
}

export default ReportGrid;
