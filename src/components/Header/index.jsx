import Navbar from "../Navbar/Index"
import Logo from '../../images/Logo.svg'
import Profile from "../Profile/Index"
import PropTypes from 'prop-types';

const Header = ({ setIsAdmin }) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center">
            <img src={Logo} className="h-20" alt="Logo" />
        </a>
      <div>
        <Profile setIsAdmin={setIsAdmin}/>
      </div>
      </div>
      <div className="navbar flex flex-wrap items-center justify-between mx-auto p-3">
        <Navbar />
      </div>
    </>
  )
}

export default Header

Header.propTypes = {
  setIsAdmin: PropTypes.func
}