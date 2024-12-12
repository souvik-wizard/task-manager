import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks } from "../../utils/api";
import { notifySuccess } from "../../utils/toast";
import AddTaskButton from "../AddTaskButton";
import AddTaskModal from "../AddTaskModal";
import TaskField from "../EditableInputField";
import FilterDropdown from "../FilterDropdown";
import SearchBar from "../SearchBar";
import TaskCounters from "../TaskCounters";
import TaskTable from "../TaskTable";

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
    notifySuccess(`Task deleted successfully from row No: ${taskId} `);
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
    notifySuccess(`Task status updated to "${newStatus}" on row No: ${taskId}`);
  };

  const updateTaskField = (taskId, field, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const columns = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <TaskField
            task={task}
            field="title"
            updateTaskField={updateTaskField}
          />
        );
      },
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <TaskField
            task={task}
            field="description"
            updateTaskField={updateTaskField}
          />
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const task = row.original;

        let statusColorClass = "";
        switch (task.status) {
          case "To Do":
            statusColorClass = "bg-blue-200 text-blue-800";
            break;
          case "In Progress":
            statusColorClass = "bg-yellow-200 text-yellow-800";
            break;
          case "Done":
            statusColorClass = "bg-green-200 text-green-800";
            break;
          default:
            statusColorClass = "bg-gray-200 text-gray-800";
            break;
        }

        return (
          <div
            className={`w-fit p-1 rounded-lg mx-auto text-center ${statusColorClass}`}
          >
            {task.status}
          </div>
        );
      },
    },
    {
      id: "changeStatus",
      header: "Change Status",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <select
            value={task.status}
            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
            className="border p-1 w-full"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        );
      },
      disableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-150 w-full mx-auto"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        );
      },
      disableSorting: true,
    },
  ];

  const filteredTasks = tasks
    .filter((task) => (filterStatus ? task.status === filterStatus : true))
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );

  const counters = {
    "To Do": tasks.filter((task) => task.status === "To Do").length,
    "In Progress": tasks.filter((task) => task.status === "In Progress").length,
    Done: tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <div className="container w-11/12 mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TaskCounters counters={counters} />
      <div className="flex flex-col md:flex-row w-full items-center justify-between gap-4 lg:gap-8 mb-4">
        <AddTaskButton onAdd={() => setModalOpen(true)} />
        <SearchBar setSearchText={setSearchText} />
        <FilterDropdown setFilterStatus={setFilterStatus} />
      </div>
      <TaskTable
        tasks={filteredTasks}
        columns={columns}
        updateTaskField={updateTaskField}
      />
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addTask={addTask}
      />
    </div>
  );
};

export default Dashboard;
