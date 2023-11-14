import { Routes, Route } from "react-router-dom";
import Report from "../pages/Report";
import Home from "../pages/Home";
import ErrorPage from "../pages/Error";
import PropTypes from 'prop-types';

const AllRoutes = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/report" element={<Report isAdmin={isAdmin} />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  )
}

export default AllRoutes

AllRoutes.propTypes = {
  isAdmin: PropTypes.bool
}