import React, { useState } from 'react';
import Form from './Form';
import Task from './Task';
import Filters from './Filters';
function App() {



  const [filter, setFilter] = useState("None");
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  function filterHandler(e) {
    if (filter === "completed") setFilter("None");
    else setFilter("completed");
  }


  function addTask(task) {
    setPendingTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: task, checked: false, done: false }]);
  }

  function checkHandler(task) {
    const updatedTask = { ...task, done: !task.done };

    if (updatedTask.done) {
      updatedTask.checked = true;
      setCompletedTasks((completedTasks) => [...completedTasks, updatedTask]);
      setPendingTasks((pendingTasks) => pendingTasks.filter((t) => t.id !== updatedTask.id));
      console.log(completedTasks);
      console.log(pendingTasks);
    } else {
      updatedTask.checked = false;
      setPendingTasks((pendingTasks) => [...pendingTasks, updatedTask])
      setCompletedTasks((completedTasks) => completedTasks.filter((t) => t.id !== updatedTask.id));
      console.log(completedTasks);
      console.log(pendingTasks);
    }
  }



  let pendingRend = pendingTasks.map((task) => (
    <Task
      name={task.text}
      id={task.id}
      key={task.id}
      checked={task.checked}
      onCheck={() => checkHandler(task)}
    />
  ));
  let completedRend = completedTasks.map((task) => (
    <Task
      name={task.text}
      id={task.id}
      key={task.id}
      checked={task.checked}
      onCheck={() => checkHandler(task)}
    />
  ));
  let display = [];
  if (filter === "completed") {
    display = completedRend;
  }
  else {
    display = pendingRend;
  }
  return (
    <div>
      <h1>TO DO List</h1>
      <Form onAddTask={addTask} />
      <Filters filterHandler={filterHandler} />

      <div className="ms-5">
        <h2 style={{ textDecoration: "underline" }}>{filter === "completed" ? "Completed Tasks" : "Pending Tasks"}</h2>

        {display}
      </div>



    </div>
  );
}

export default App;
