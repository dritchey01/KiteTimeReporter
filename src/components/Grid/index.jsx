import { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import {
  GridColumnMenuSort,
  GridColumnMenuFilter,
} from "@progress/kendo-react-grid";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import PropTypes from "prop-types";
// import { employees } from "../../mocks/employees";
import "./grid.css";
import { CommandCell } from "./CustomCells/CommandCell";
import { DateCell } from "./CustomCells/DateCell";
import { DropDownCell } from "./CustomCells/DropDownCell";
import { v4 as uuid } from "uuid";

const ReportGrid = ({ selectedUser }) => {
  const DATA_ITEM_KEY = "id";
  const editField = "inEdit";
  const contracts = ["ATLAS", "KAP", "DLM", "ATS", "Misc"];
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

  const [data, setData] = useState([]);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter);

  const handleSortChange = (sortObj) => {
    setSort(sortObj);
    setData(orderBy(data, sortObj));
  };

  const handleFilterChange = (filterObj) => {
    setFilter(filterObj);
    setData(filterBy(data, filterObj));
  };

  const dataStateChange = (event) => {
    // in case we need to set data?
    console.log(event);
  };

  const itemChange = (e) => {
    const newData = data.map((item) =>
      item.id === e.dataItem.id
        ? {
            ...item,
            [e.field || ""]: e.value,
          }
        : item
    );
    setData(newData);
  };

  const addNew = () => {
    const [firstName, lastName] = selectedUser.split(" ");
    const newDataItem = {
      id: uuid(),
      inEdit: true,
      firstName,
      lastName,
      isNew: true,
    };
    setData([newDataItem, ...data]);
  };

  const add = (dataItem) => {
    const idx = data.findIndex((row) => row.id === dataItem.id);
    dataItem.inEdit = false;
    const newData = [...data];
    newData[idx] = dataItem;
    setData(newData);
  };

  const remove = (dataItem) => {
    const newData = data.filter((row) => row.id !== dataItem.id);
    setData(newData);
  };

  const enterEdit = (dataItem) => {
    setData(
      data.map((row) =>
        row.id === dataItem.id
          ? {
              ...row,
              inEdit: true,
            }
          : row
      )
    );
  };

  const ColumnMenu = (props) => {
    return (
      <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter {...props} />
      </div>
    );
  };

  const commandCellFn = (props) => (
    <CommandCell
      editField={editField}
      add={add}
      remove={remove}
      edit={enterEdit}
      {...props}
    />
  );

  const contractCellFn = (props) => (
    <DropDownCell editField={editField} list={contracts} {...props} />
  );

  return (
    <div>
      <Grid
        style={{
          height: "auto",
        }}
        pageable={{
          pageSizes: true,
        }}
        data={data}
        sortable={true}
        sort={sort}
        onSortChange={(e) => {
          handleSortChange(e.sort);
        }}
        filter={filter}
        onFilterChange={(e) => {
          handleFilterChange(e.filter);
        }}
        total={data.count}
        onDataStateChange={dataStateChange}
        {...initialDataState}
        dataItemKey={DATA_ITEM_KEY}
        editField={editField}
        onItemChange={(e) => {
          itemChange(e);
        }}
      >
        <Column
          field="firstName"
          title="First Name"
          columnMenu={ColumnMenu}
          width="250px"
          editable={false}
        />
        <Column
          field="lastName"
          title="Last Name"
          columnMenu={ColumnMenu}
          width="220px"
          editable={false}
        />
        <Column
          field="contract"
          title="Contract"
          columnMenu={ColumnMenu}
          cell={contractCellFn}
          width="220px"
        />
        <Column
          field="taskName"
          title="Task Name"
          columnMenu={ColumnMenu}
          width="220px"
        />
        <Column
          field="hours"
          title="Hours"
          columnMenu={ColumnMenu}
          width="220px"
          editor="numeric"
        />
        <Column
          field="workWeek"
          title="Work Week"
          columnMenu={ColumnMenu}
          width="220px"
          cell={DateCell}
        />
        <Column
          field="description"
          title="Description"
          columnMenu={ColumnMenu}
          width="300px"
        />
        <Column title="Commands" cell={commandCellFn} width="300px" />
      </Grid>
      <button
        className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-5 mr-3 float-right"
        type="button"
        onClick={() => {
          addNew();
        }}
      >
        Add new
      </button>
    </div>
  );
};

export default ReportGrid;

ReportGrid.propTypes = {
  selectedUser: PropTypes.object,
};
