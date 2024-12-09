import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import Card from "../Card/Card";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const onAddTask = () => {
    if (!task) return; 
    const newTask = {
      id: uuidv4(),
      title: task,
      isDone: false,
      createdAt: new Date(),
    };

    setTasks((prevState) => [...prevState, newTask]);
    setTask(""); 
  };

  const onSwitchCardStatus = (id) => {
    setTasks((prevState) => {
      const modifiedTasks = prevState.map((ps) => {
        if (ps.id === id) {
          return { ...ps, isDone: !ps.isDone };
        }
        return ps;
      });
      return modifiedTasks;
    });
  };
  

const onCardClicked = (id) => {
  setTasks((prevState) => {
    const modifiedTasks = prevState.map((ps) => {
      if (ps.id === id) {
        return { ...ps, isDone: !ps.isDone }
      }

      return {... ps}
    });

    return {...modifiedTasks}
  });
};
 

  const onCardDeleted = (id) => {
    setTasks((prevState) => {
      return prevState.filter((t) => t.id !== id);
    });
  };

  return (
    <div className={styles.main}>
      <h1>To Do App</h1>
      <div className={styles.form}>
        <input
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={onAddTask}>Add Task</button>
      </div>

      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <Card 
            id={t.id}
              key={t.id} 
              title={t.title} 
              isDone={t.isDone} 
              onDelete={() => onCardDeleted(t.id)}
              onClick={onSwitchCardStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;