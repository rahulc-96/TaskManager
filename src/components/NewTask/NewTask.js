import React from "react";
import TaskForm from "./TaskForm";
import Section from "../UI/Section";
import useHttpClient from "../hook/useHttpClient";

const NewTask = (props) => {
  const { error, isLoading, sendRequest: addNewTask } = useHttpClient();

  const addTaskResponseHandler = (taskText, response) => {
    const addedTask = { id: response.name, name: taskText }; //name is auto-generated id firebase specific
    props.onAddTask(addedTask);
  };

  const addTaskHandler = async (taskText) => {
    const request = {
      url: "https://task-manager-73599-default-rtdb.firebaseio.com/task.json",
      method: 'POST',
      body: { name: taskText },
      headers: { "Content-Type": "application/json" },
    };

    addNewTask(request, addTaskResponseHandler.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onAddTask={addTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
