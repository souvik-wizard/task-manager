import React from "react";

const AddTaskButton = ({ onAdd }) => {
  return (
    <button
      className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-200"
      onClick={onAdd}
    >
      Add New Task
    </button>
  );
};

export default AddTaskButton;
