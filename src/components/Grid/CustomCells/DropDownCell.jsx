import PropTypes from "prop-types";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const DropDownCell = ({ dataItem, editField, field }) => {
  const inEdit = dataItem[editField];
  const isNewItem = dataItem.id === undefined;
  return inEdit ? (
    <td className="k-command-cell">
      <DropDownList data={["a", "b", "c", "d", "e", "f"]} />
    </td>
  ) : (
    <td className="k-command-cell">{dataItem[field]}</td>
  );
};

DropDownCell.propTypes = {
  dataItem: PropTypes.object,
  editField: PropTypes.string,
  field: PropTypes.string,
};
