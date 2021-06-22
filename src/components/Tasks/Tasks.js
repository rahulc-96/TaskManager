import styles from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import Section from "../UI/Section";

const Tasks = (props) => {
  let content = <h2>No Task Found. Try Adding Some!!</h2>;

  if (props.tasks.length > 0) {
    const taskList = props.tasks.map((task) => (
      <TaskItem key={task.id}>{task.name}</TaskItem>
    ));
    content = <ul>{taskList}</ul>;
  }

  if (props.error) {
    content = <button onClick={props.onFetch}>Try Reloading Data</button>;
  }

  if (props.loading) {
    content = "Fetching Data";
  }

  return (
    <Section>
      <div className={styles.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
