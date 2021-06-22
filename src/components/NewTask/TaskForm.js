import React, { useRef, useState } from "react";
import styles from "./TaskForm.module.css";

const TaskForm = (props) => {
  const inputRef = useRef();
  const [invalid, setInvalid] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let task = inputRef.current.value;
    if (task.trim().length > 0) {
      props.onAddTask(inputRef.current.value);
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        {!props.loading && <input type="text" ref={inputRef} />}
        {props.loading && <p>Sending Request....</p>}
        <button type="submit"> Add Task</button>
      </form>
      <div className={styles.warning}>
      {!props.loading && invalid && (
        <p>Please enter valid task</p>
      )}
      </div>

    </React.Fragment>
  );
};

export default TaskForm;
