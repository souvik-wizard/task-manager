import React from "react";

const TaskCounters = ({ counters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {Object.entries(counters).map(([status, count]) => (
        <div
          key={status}
          className="p-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-center rounded-lg shadow-md"
        >
          <h4 className="text-lg font-bold">{status}</h4>
          <p className="text-2xl font-semibold">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskCounters;
