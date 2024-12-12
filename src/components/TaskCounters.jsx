import React from "react";

const TaskCounters = ({ counters }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {Object.entries(counters).map(([status, count]) => (
        <div
          key={status}
          className="p-4 border text-center rounded-lg shadow-sm"
        >
          <h4 className="text-lg ">{status}</h4>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskCounters;
