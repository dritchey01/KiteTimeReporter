import PropTypes from "prop-types";
// import Moment from "react-moment";

export const DateCell = ({ dataItem, field, onChange }) => {
  const getDateOfWeek = (week, year) => {
    const weekNumber = week.split("W")[1];
    var day = 1 + (weekNumber - 1) * 7; // 1st of January + 7 days for each week

    const startDate = new Date(year, 0, day).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const endDate = new Date(year, 0, day + 6).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return `${startDate} - ${endDate}`;
  };

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

  return dataItem?.inEdit || !dataItem.id ? (
    <td className="k-command-cell">
      <input type="week" onChange={handleChange} value={dataItem["workWeek"]} />
    </td>
  ) : (
    <td className="k-command-cell">
      {dataItem["workWeek"]
        ? getDateOfWeek(dataItem["workWeek"], new Date().getFullYear())
        : ""}
    </td>
  );
};

DateCell.propTypes = {
  dataItem: PropTypes.object,
  editField: PropTypes.string,
  onChange: PropTypes.func,
  field: PropTypes.string,
};
