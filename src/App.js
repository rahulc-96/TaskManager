import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  

  const fetchData = async function () {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://task-manager-73599-default-rtdb.firebaseio.com/task.json"
      );
      if (!response.ok) {
        throw new Error("Error occurred while fetching tasks");
      }

      const data = await response.json();
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, name: data[taskKey].name });
      }
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong !!");
    }
    setIsLoading(false);
  };

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => prevTasks.concat(newTask))
  }

  useEffect( () => fetchData(), []);

  
  return (
    <React.Fragment>
      <NewTask onAddTask = {addTaskHandler}/>
      <Tasks
        tasks = {tasks}
        onFetch = {fetchData}
        loading = {isLoading}
        error = {error}
      />
    </React.Fragment>
  );
}

export default App;
