import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-2 md:p-0 mt-4 border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0">
        <li>
          <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">Home</Link>
        </li>
        <li>
          <Link to="/report" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white">Report</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar