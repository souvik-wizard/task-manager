import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

const TaskTable = ({ tasks, columns, updateTaskField }) => {
  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-blue-500 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left relative group cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {!header.column.columnDef.disableSorting && (
                      <span
                        className="flex items-center text-sm text-gray-200 opacity-75 group-hover:opacity-100 transition-opacity"
                        title="Click to sort"
                      >
                        {header.column.getIsSorted() === "asc" && (
                          <FaSortUp className="text-white" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <FaSortDown className="text-white" />
                        )}
                        {!header.column.getIsSorted() && (
                          <FaSort className="text-white opacity-50 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 transition-all">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
