import { Routes, Route } from "react-router-dom";
import Report from "../pages/Report";
import Home from "../pages/Home";
import ErrorPage from "../pages/Error";
import PropTypes from "prop-types";

const AllRoutes = ({ users }) => {
  return (
    <Routes>
      <Route path="/" element={<Home users={users} />} />
      <Route path="/report" element={<Report users={users} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AllRoutes;

AllRoutes.propTypes = {
  isAdmin: PropTypes.bool,
  users: PropTypes.array,
};
