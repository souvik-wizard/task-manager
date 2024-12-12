import axios from "axios";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(response.data);
    return response.data.slice(0, 20).map((task) => ({
      id: task.id,
      title: task.title,
      description: `Task ${task.id} description`,
      status: task.completed ? "Done" : "To Do",
    }));
  } catch (error) {
    console.error(error);
  }
};
