import React, { useState, useEffect, useCallback, useMemo } from "react";
import useHttpClient from "./components/hook/useHttpClient";
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const { error, isLoading, sendRequest: fetchTasks } = useHttpClient();
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (newTask) => {
    setTasks((prevTasks) => prevTasks.concat(newTask));
  };

  const request = useMemo(() => {
    return {
      url: "https://task-manager-73599-default-rtdb.firebaseio.com/task.json",
    };
  }, []);

  const fetchResponseHandler = useCallback((data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, name: data[taskKey].name });
    }
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    fetchTasks(request, fetchResponseHandler);
  }, [fetchTasks, fetchResponseHandler, request]);

  return (
    <React.Fragment>
      <NewTask onAddTask={addTaskHandler} />
      <Tasks
        tasks={tasks}
        onFetch={fetchTasks.bind(null, request, fetchResponseHandler)}
        loading={isLoading}
        error={error}
      />
    </React.Fragment>
  );
}

export default App;
