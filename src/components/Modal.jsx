/* eslint-disable react/prop-types */
// src/Modal.js

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-11/12 overflow-hidden bg-white rounded-lg shadow-lg md:max-w-md">
        <div className="p-4">
          <button 
            className="float-right text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="mt-4 text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
