import PropTypes from "prop-types";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const DropDownCell = ({ dataItem, field, list, onChange }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange({
        dataIndex: 0,
        dataItem: dataItem,
        field: field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      });
    }
  };

  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  return dataItem.inEdit ? (
    <td className="k-command-cell">
      <DropDownList
        data={list}
        onChange={handleChange}
        value={list.find((str) => str === dataValue)}
      />
    </td>
  ) : (
    <td className="k-command-cell">{dataItem[field]}</td>
  );
};

DropDownCell.propTypes = {
  dataItem: PropTypes.object,
  editField: PropTypes.string,
  field: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
};
