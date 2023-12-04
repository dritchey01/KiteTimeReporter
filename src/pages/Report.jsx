import { useState } from "react";
import PropTypes from "prop-types";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";

const ReportPage = ({ users }) => {
  const [empRowData, setEmpRowData] = useState([
    {
      firstName: "Andy",
      lastName: "Greenhaw",
      email: "AG@Ku.edu",
      userName: "AGKU",
      contract: "ATLAS",
      taskName: "Create New Maps",
      hours: "20",
      workWeek: "2023-W26",
      description: "Created a new Map to demo for ATLAS",
    },
    {
      firstName: "Andy",
      lastName: "Greenhaw",
      email: "AG@Ku.edu",
      userName: "AGKU",
      contract: "ATLAS",
      taskName: "Fix QA Defects",
      hours: "28",
      workWeek: "2023-W26",
      description: "Address new defect list",
    },
    {
      firstName: "Andy",
      lastName: "Greenhaw",
      email: "AG@Ku.edu",
      userName: "AGKU",
      contract: "ATLAS",
      taskName: "Design workflow",
      hours: "6",
      workWeek: "2023-W26",
      description: "Create new working doc for workflow in LM",
    },
  ]);

  const [reportParams, setReportParams] = useState({
    name: "",
    dateRange: "",
  });

  const handleFormSubmit = (data) => {
    setEmpRowData([...empRowData, data]);
  };

  const handleSelectUser = () => {};

  const dateInputSettings = {
    label: null,
  };

  const calendarSettings = {
    weekNumber: true,
  };

  return (
    <>
      To Generate a report for a user across all weeks select user and submit,
      alternatively, select user and specific week
      <div className="flex flex-row">
        <div className="basis-1/4 p-2">
          Please select user for report: <DropDownList data={users} />
        </div>
        <div className="basis-1/6 p-2">
          Please select date range for report:{" "}
          <DateRangePicker
            startDateInputSettings={dateInputSettings}
            endDateInputSettings={dateInputSettings}
            max={new Date()}
            calendarSettings={calendarSettings}
          />
        </div>
        <div className="py-8">
          <Button style={{ backgroundColor: "#1560b7", color: "white" }}>
            Show Report
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReportPage;

ReportPage.propTypes = {
  users: PropTypes.array,
};
