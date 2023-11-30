import PropTypes from "prop-types";

export const DateCell = ({ dataItem, editField }) => {
  const inEdit = dataItem[editField];
  return inEdit || !dataItem.id ? (
    <td className="k-command-cell">
      <input type="week" />
    </td>
  ) : (
    <td className="k-command-cell">{dataItem["workWeek"]}</td>
  );
};

DateCell.propTypes = {
  dataItem: PropTypes.object,
  editField: PropTypes.string,
};
