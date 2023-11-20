/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { getter } from '@progress/kendo-react-common';
import { process } from '@progress/kendo-data-query';
import { Input } from '@progress/kendo-react-inputs';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { GridColumnMenuSort, GridColumnMenuFilter, GridColumnMenuGroup } from '@progress/kendo-react-grid';
import { setGroupIds, setExpandedState } from '@progress/kendo-react-data-tools';
import { employees } from '../mocks/employees';
import PropTypes from 'prop-types';
import './grid.css'

const ReportPage = () => {
  const idGetter = getter('id');
  const DATA_ITEM_KEY = "id";
  const SELECTED_FIELD = "selected";
  const initialDataState = {
    take: 10,
    skip: 0,
    group: [],
  };
  const [filteredData, setFilteredData] = useState(employees);
  const [currentSelectedState, setCurrentSelectedState] = useState({});
  const [dataState, setDataState] = useState(initialDataState);
  const [dataResult, setDataResult] = useState(process(filteredData, dataState));
  const [data, setData] = useState(filteredData);
  const [filterValue, setFilterValue] = useState();

  const processWithGroups = (data, dataState) => {
    const newDataState = process(data, dataState);
    setGroupIds({
      data: newDataState.data,
      group: dataState.group
    });
    return newDataState;
  };

  const [resultState, setResultState] = useState(processWithGroups(employees.map(item => ({
    ...item,
    ['selected']: currentSelectedState[idGetter(item)]
  })), initialDataState));

  const onExpandChange = useCallback(event => {
    const newData = [...dataResult.data];
    const item = event.dataItem;
    if (item.groupId) {
      const targetGroup = newData.find(d => d.groupId === item.groupId);
      if (targetGroup) {
        targetGroup.expanded = event.value;
        setDataResult({
          ...dataResult,
          data: newData
        });
      }
    } else {
      item.expanded = event.value;
      setDataResult({
        ...dataResult,
        data: newData
      });
    }
  }, [dataResult]);

  const dataStateChange = event => {
    setDataResult(process(filteredData, event.dataState));
    setDataState(event.dataState);
  };

  const onSelectionChange = event => {
    // const selectedProductId = event.dataItem.id;
    // const newData = data.map(item => {
    //   if (item.id === selectedProductId) {
    //     item.selected = !item.selected;
    //   }
    //   return item;
    // });
    // setCurrentSelectedState(prevState => ({
    //   ...prevState,
    //   [selectedProductId]: !prevState[selectedProductId]
    // }));
    // const newDataResult = processWithGroups(newData, dataState);
    // setDataResult(newDataResult);
  };

  const onFilterChange = ev => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = employees.filter(item => {
      let match = false;
      for (const property in item) {
        if (item[property].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
          match = true;
        }
        if (item[property].toLocaleDateString && item[property].toLocaleDateString().indexOf(value) >= 0) {
          match = true;
        }
      }
      return match;
    });
    setFilteredData(newData);
    let clearedPagerDataState = {
      ...dataState,
      take: 8,
      skip: 0
    };
    let processedData = process(newData, clearedPagerDataState);
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
    setData(newData);
  };

  const setSelectedValue = data => {
    let newData = data.map(item => {
      if (item.items) {
        return {
          ...item,
          items: setSelectedValue(item.items)
        };
      } else {
        return {
          ...item,
          ['selected']: currentSelectedState[idGetter(item)]
        };
      }
    });
    return newData;
  };

  const newData = setExpandedState({
    data: setSelectedValue(resultState.data),
    collapsedIds: []
  });

  const getNumberOfSelectedItems = data => {
    let count = 0;
    data.forEach(item => {
      if (item.items) {
        count = count + getNumberOfSelectedItems(item.items);
      } else {
        count = count + (item.selected == true ? 1 : 0);
      }
    });
    return count;
  };

  const checkHeaderSelectionValue = () => {
    let selectedItems = getNumberOfSelectedItems(newData);
    return newData.length > 0 && selectedItems == getNumberOfItems(newData);
  };

  const getNumberOfItems = data => {
    let count = 0;
    data.forEach(item => {
      if (item.items) {
        count = count + getNumberOfItems(item.items);
      } else {
        count++;
      }
    });
    return count;
  };

  const CountryCell = ({
    dataItem,
    ...props
  }) => {
    if (!dataItem || !dataItem.flag) {
      return null;
    }
    return <td {...props.tdProps}>
        <img src={dataItem.flag} width="30" height="16" alt="Flag" style={{
        marginLeft: '12px'
      }} />
      </td>;
  };

  const ColumnMenu = props => {
    return <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter {...props} />
        <GridColumnMenuGroup {...props} />
      </div>;
  };

  const BudgetCell = ({
    dataItem,
    ...props
  }) => {
    if (dataItem && dataItem.target !== undefined) {
      const budget = dataItem.target;
      const formattedBudget = `$${budget.toFixed(3)}`;
      return <td {...props.tdProps}>{formattedBudget}</td>;
    }
  }

  return (
    <div>
      <Grid style={{
        height: '500px'
      }} pageable={{
        pageSizes: true
      }} data={dataResult} sortable={true} total={filteredData.count} onDataStateChange={dataStateChange} {...dataState} onExpandChange={onExpandChange} expandField="expanded" dataItemKey={DATA_ITEM_KEY} selectedField={SELECTED_FIELD} onSelectionChange={onSelectionChange} groupable={true} size={'small'}>
          <GridToolbar>
            <Input value={filterValue} onChange={onFilterChange} style={{
            border: '2px solid #ccc',
            boxShadow: 'inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)',
            width: '170px',
            height: '30px',
            marginRight: '10px'
          }} placeholder="Search in all columns..." />
            <div className="export-btns-container">
              <Button>Export to Excel</Button>
              <Button>Export to PDF</Button>
            </div>
          </GridToolbar>
          <Column filterable={false} field={SELECTED_FIELD} width={50} headerSelectionValue={checkHeaderSelectionValue()} />
          <Column title="Employee">
            <Column field="full_name" title="Contact Name" columnMenu={ColumnMenu} cells={{
            data: CountryCell
          }} width="250px" />
            <Column field="job_title" title="Job Title" filter="numeric" columnMenu={ColumnMenu} width="220px" />
            <Column field="flag" title="Country" filter="numeric" cells={{
            data: CountryCell
          }} columnMenu={ColumnMenu} width="100px" />
          </Column>
          <Column title="Perforamnce">
            <Column field="budget" title="Budget" columnMenu={ColumnMenu} cells={{
            data: BudgetCell
          }} width="230px" />
          </Column>
          <Column title="Contacts">
            <Column field="phone" title="Phone" columnMenu={ColumnMenu} width="230px" />
            <Column field="address" title="Address" columnMenu={ColumnMenu} width="230px" />
          </Column>
        </Grid>
    </div>
  )
}

export default ReportPage;

