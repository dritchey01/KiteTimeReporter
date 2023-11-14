import { useState } from "react";
import { FaCaretLeft, FaCaretDown } from "react-icons/fa6";
import PropTypes from 'prop-types';

const Profile = ({ setIsAdmin }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
  <div>
    <div className="items-center" onClick={() => {setIsOpen(!isOpen)}}>
      Signed in as DRitchey
      {isOpen ? (<FaCaretDown style={{display: 'inline'}}/>) : (<FaCaretLeft style={{display: 'inline'}}/>)}
    </div>
    {
      isOpen && (
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-jg p-2">
          <div className="flex justify-between hover:gb-blue-200 cursor-pointer rounded-r-lg border-l-transparent">
            <h3 className="mr-5" onClick={() => {setIsAdmin((oldState) => !oldState)}}>Admin View</h3>
            {/* <h3>item 1.b</h3> */}
          </div>
        </div>
      )
    }
  </div>
  )
}

export default Profile

Profile.propTypes = {
  setIsAdmin: PropTypes.func
}