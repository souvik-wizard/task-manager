import React, { useState, useEffect } from "react";
import { notifySuccess } from "../utils/toast";

const TaskField = ({ task, field, updateTaskField }) => {
  const [value, setValue] = useState(task[field]);

  const handleBlur = () => {
    console.log("Field Updated:", field);
    if (value.trim() !== "" && value.trim() !== task[field].trim()) {
      updateTaskField(task.id, field, value);
      console.log("Field Updated:", field.toUpperCase(), value, task.id);
      notifySuccess(
        `${field.charAt(0).toUpperCase() + field.slice(1)} updated on row No: ${
          task.id
        }`
      );
    }
  };

  useEffect(() => {
    setValue(task[field]);
  }, [task, field]);

  return (
    <input
      type="text"
      value={value}
      className="border p-1 w-full"
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

export default TaskField;
