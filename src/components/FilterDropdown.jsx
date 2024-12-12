import React from "react";

const FilterDropdown = ({ setFilterStatus }) => {
  const handleChange = (e) => {
    console.log("Filter Status:", e.target.value);
    setFilterStatus(e.target.value);
  };

  return (
    <div className="w-full lg:w-auto">
      <select
        onChange={handleChange}
        className="border p-2 w-full lg:w-auto rounded"
      >
        <option value="">All Statuses</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
