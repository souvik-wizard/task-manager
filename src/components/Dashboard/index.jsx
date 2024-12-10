import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { fetchTasks } from "../../utils/api";
import { notifySuccess } from "../../utils/toast";
import AddTaskModal from "../AddTaskModal";
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
    fetchTasks().then(setTasks);
  }, []);

  const addTask = (newTask) => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    notifySuccess("Task added successfully!");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    notifySuccess("Task deleted successfully!");
  };

  const columns = [
    { title: "Task ID", field: "id", width: 70 },
    { title: "Title", field: "title", editor: "input" },
    { title: "Description", field: "description", editor: "input" },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
    },
    {
      title: "Actions",
      field: "actions",
      formatter: () =>
        '<button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>',
      cellClick: (e, cell) => {
        const taskId = cell.getRow().getData().id;
        deleteTask(taskId);
      },
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <TaskCounters counters={counters} />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
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
