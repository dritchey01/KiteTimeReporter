import { useState } from "react";
import ReportGrid from "../components/Grid/index";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import PropTypes from "prop-types";

const Home = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div>
      <div className="grid grid-cols-8 p-2">
        <div className="col-span-1">Please select your Name: </div>
        <DropDownList
          data={users}
          onChange={handleChange}
          value={users.find((str) => str === selectedUser)}
          className="col-span-2"
        />
      </div>
      {selectedUser && <ReportGrid selectedUser={selectedUser} />}
    </div>
  );
};

export default Home;

Home.propTypes = {
  users: PropTypes.array,
};
