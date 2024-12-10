import React from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator.min.css";

const TaskTable = ({ tasks, columns }) => {
  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <ReactTabulator
        data={tasks}
        columns={columns}
        layout="fitColumns"
        options={{
          movableRows: true,
          responsiveLayout: "collapse",
        }}
        className="tabulator-custom-theme"
      />
    </div>
  );
};

export default TaskTable;
