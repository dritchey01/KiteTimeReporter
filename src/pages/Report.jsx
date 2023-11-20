import { useState } from "react"
import Form from "../components/Form"
import Grid from "../components/Grid"
import Modal from "../components/Modal"
import PropTypes from 'prop-types';

const ReportPage = ({ isAdmin }) => {
  const [showModal, setShowModal] = useState(false)
  const [adminRowData] = useState([
    { 
      firstName: "Andy",
      lastName: "Greenhaw",
      email: 'AG@Ku.edu',
      userName: 'AGKU',
      contract: 'ATLAS',
      taskName: 'Create New Maps',
      hours: '20',
      workWeek: '2023-11-01',
      description: 'Created a new Map to demo for ATLAS'
    },
    { 
      firstName: "Sean",
      lastName: "Skaggs",
      email: 'SS@Ku.edu',
      userName: 'SSKU',
      contract: 'PLTW',
      taskName: 'Run integration testin',
      hours: '35',
      workWeek: '2023-11-4',
      description: 'Ran new integration testings for the CP app'
    },
    { 
      firstName: "Dj",
      lastName: "Ritchey",
      email: 'DR@Ku.edu',
      userName: 'DRKU',
      contract: 'DLM',
      taskName: 'Create Reporting feature',
      hours: '18',
      workWeek: '2023-11-01',
      description: 'Add new report download feature'
    },
    { 
      firstName: "Fethi",
      lastName: "Akcay",
      email: 'FA@Ku.edu',
      userName: 'FAKU',
      contract: 'KAP',
      taskName: 'Work on External Review',
      hours: '38',
      workWeek: '2023-11-05',
      description: 'Add new feature to External Review for KAP clients'
    },
  ]);

  const [empRowData, setEmpRowData] = useState([
    { 
      firstName: "Andy",
      lastName: "Greenhaw",
      email: 'AG@Ku.edu',
      userName: 'AGKU',
      contract: 'ATLAS',
      taskName: 'Create New Maps',
      hours: '20',
      workWeek: '2023-11-01',
      description: 'Created a new Map to demo for ATLAS'
    },
    { 
      firstName: "Andy",
      lastName: "Greenhaw",
      email: 'AG@Ku.edu',
      userName: 'AGKU',
      contract: 'ATLAS',
      taskName: 'Fix QA Defects',
      hours: '28',
      workWeek: '2023-11-02',
      description: 'Address new defect list'
    },
    { 
      firstName: "Andy",
      lastName: "Greenhaw",
      email: 'AG@Ku.edu',
      userName: 'AGKU',
      contract: 'ATLAS',
      taskName: 'Design workflow',
      hours: '6',
      workWeek: '2023-11-04',
      description: 'Create new working doc for workflow in LM'
    },
  ]);

  const handleFormSubmit = (data) => {
    setEmpRowData([...empRowData, data])
  }

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} handleFormSubmit={handleFormSubmit}>{<Form />}</Modal>
      <span>
      </span>
      <span>
        <Grid isAdmin={isAdmin} adminRowData={adminRowData} empRowData={empRowData}/>
        {
          isAdmin ? (
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-5 mr-3 float-right"
              type="button"
              onClick={() => alert('pseudo download')}
            >
              Download
            </button>
          ) : (
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-5 mr-3 float-right"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add new
            </button>
          )
        }


      </span>
    </div>
  )
}

export default ReportPage

ReportPage.propTypes = {
  isAdmin: PropTypes.bool
}