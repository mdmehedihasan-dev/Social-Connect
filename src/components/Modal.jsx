/* eslint-disable react/prop-types */
// src/Modal.js

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:max-w-md">
        <div className="p-4">
          <button 
            className="float-right text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
