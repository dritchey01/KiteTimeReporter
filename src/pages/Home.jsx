import { useState } from 'react';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import ReportGrid from '../components/Grid/index'

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  return (
    <div>
      {
        selectedUser ? (
          <ReportGrid />
        ) : (
          <fieldset className='content-center flex justify-center items-center mt-3'>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Welcome</div>
                <p className="text-gray-700 text-base">
                  Please select your name from the dropdown list to see task grid for reporting purposes
                </p>
                <DropDownList
              style={{
                width: "300px",
              }}
              data={['Andy Greenhaw', 'Fethi Akcay', 'Dj Ritchey']}
              defaultValue="Select an Employee"
              onChange={(e) => {console.log(e)}}
            />
              </div>
            </div>
          </fieldset>
        )
      }
    </div>
  )
}

export default Home;

