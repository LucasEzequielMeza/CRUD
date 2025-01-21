import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <>
      {tasks.map((task) => (
        <div key={task._id}>
          <h1> {task.title} </h1>
          <p> {task.description} </p>
        </div>
      ))}
    </>
  );
}

export default TasksPage