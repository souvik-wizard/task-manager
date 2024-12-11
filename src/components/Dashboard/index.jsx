import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks } from "../../utils/api";
import AddTaskModal from "../AddTaskModal";
import FilterDropdown from "../FilterDropdown";
import SearchBar from "../SearchBar";
import TaskCounters from "../TaskCounters";
import TaskTable from "../TaskTable";
import { notifySuccess, notifyWarning } from "../../utils/toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks().then((fetchedTasks) => {
      const mappedTasks = fetchedTasks.map((task) => ({
        ...task,
        status: task.status,
      }));
      setTasks(mappedTasks);
    });
  }, []);

  const addTask = (newTask) => {
    const task = {
      id: tasks.length + 1,
      userId: 1,
      ...newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    notifySuccess("Task added successfully!");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    notifySuccess("Task deleted successfully!");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus,
            completed: newStatus === "Done",
          }
        : task
    );

    setTasks(updatedTasks);
    notifyWarning(`Task status updated to ${newStatus}`);
  };

  const updateTaskField = (taskId, field, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
    notifySuccess(`${field} updated successfully!`);
  };

  const columns = [
    {
      title: "ID",
      field: "id",
      width: 70,
    },
    {
      title: "Title",
      field: "title",
      formatter: (cell) => {
        const row = cell.getRow();
        const task = row.getData();
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.title;
        input.className = "border p-1 rounded w-full";

        let originalValue = input.value;
        input.addEventListener("input", () => {
          input.dataset.changed =
            input.value !== originalValue ? "true" : "false";
        });

        input.addEventListener("blur", () => {
          if (input.dataset.changed === "true") {
            updateTaskField(task.id, "title", input.value);
          }
        });

        return input;
      },
    },
    {
      title: "Description",
      field: "description",
      formatter: (cell) => {
        const row = cell.getRow();
        const task = row.getData();
        const input = document.createElement("textarea");
        input.value = task.description;
        input.className = "border p-1 rounded w-full";

        let originalValue = input.value;
        input.addEventListener("input", () => {
          input.dataset.changed =
            input.value !== originalValue ? "true" : "false";
        });

        input.addEventListener("blur", () => {
          if (input.dataset.changed === "true") {
            updateTaskField(task.id, "description", input.value);
          }
        });

        return input;
      },
    },

    {
      title: "Status",
      field: "status",
    },
    {
      title: "Change Status",
      field: "changeStatus",

      formatter: (cell) => {
        const select = document.createElement("select");
        select.innerHTML = `
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        `;

        select.value = cell.getRow().getData().status;

        select.addEventListener("change", (e) => {
          const newStatus = e.target.value;
          const taskId = cell.getRow().getData().id;
          updateTaskStatus(taskId, newStatus);
        });

        return select;
      },
    },
    {
      title: "Actions",
      field: "actions",
      formatter: () =>
        '<button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-150">Delete</button>',
      cellClick: (e, cell) => {
        const taskId = cell.getRow().getData().id;
        deleteTask(taskId);
      },
    },
  ];

  const filteredTasks = tasks
    .filter((task) => (filterStatus ? task.status === filterStatus : true))
    .filter((task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );

  const counters = {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    Done: tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <TaskCounters counters={counters} />

      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Add Task
        </button>

        <FilterDropdown
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
      </div>

      <SearchBar searchText={searchText} onSearch={setSearchText} />

      <TaskTable tasks={filteredTasks} columns={columns} />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
};

export default Dashboard;
