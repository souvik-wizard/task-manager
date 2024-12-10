import React, { useState } from "react";

const DeleteButton = ({ onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
