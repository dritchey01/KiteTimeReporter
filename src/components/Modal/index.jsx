import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';

const Modal = ({ showModal, setShowModal, children, handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    contract: '',
    taskName: '',
    hours: '',
    workWeek: '',
    description: '',
  })

  const handleChange = (e) => {
    let {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add new Task
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {cloneElement(children, {formData: formData, setFormData: setFormData, handleChange: handleChange})}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleFormSubmit(formData)
                      setShowModal(false)
                    }}
                  >
                    Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  children: PropTypes.func,
  handleFormSubmit: PropTypes.func,
}