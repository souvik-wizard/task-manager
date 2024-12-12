import React from "react";

const AddTaskButton = ({ onAdd }) => {
  return (
    <button
      className="bg-blue-500 text-white  rounded  whitespace-nowrap p-2 w-full md:w-auto"
      onClick={onAdd}
    >
      Add New Task
    </button>
  );
};

export default AddTaskButton;
