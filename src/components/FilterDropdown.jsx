import React from "react";

const FilterDropdown = ({ filterStatus, onFilterChange }) => {
  return (
    <select
      className="border p-2 rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
      value={filterStatus}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="">Filter by Status</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterDropdown;
