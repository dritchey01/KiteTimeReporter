import PropTypes from "prop-types";

export const CommandCell = ({
  dataItem,
  add,
  update,
  edit,
  cancel,
  remove,
}) => {
  return dataItem?.inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => (dataItem.isNew ? add(dataItem) : add(dataItem))}
      >
        {dataItem.isNew ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => (dataItem.isNew ? remove(dataItem) : cancel(dataItem))}
      >
        {dataItem.isNew ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => edit(dataItem)}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() => confirm("Confirm deleting Row? ") && remove(dataItem)}
      >
        Remove
      </button>
    </td>
  );
};

CommandCell.propTypes = {
  dataItem: PropTypes.object,
  editField: PropTypes.string,
  add: PropTypes.func,
  update: PropTypes.func,
  edit: PropTypes.func,
  discard: PropTypes.func,
  cancel: PropTypes.func,
  remove: PropTypes.func,
};
