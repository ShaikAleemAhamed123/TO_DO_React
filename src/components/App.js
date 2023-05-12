import React, { useState, useEffect } from 'react';
import Form from './Form';
import Task from './Task';
import Filters from './Filters';

function App() {



  const [filter, setFilter] = useState('None');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);


  useEffect(() => {
    const storedPendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setPendingTasks(prevPendingTasks => [...prevPendingTasks, ...storedPendingTasks]);
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, ...storedCompletedTasks]);
  }, []);

  useEffect(() => {
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
  }, [pendingTasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  function filterHandler() {
    setFilter(filter === 'completed' ? 'None' : 'completed');
  }

  function addTask(task) {
    const newTask = {
      id: Date.now(),
      text: task,
      checked: false,
      key: Date.now(),
      done: false
    };
    setPendingTasks(prevTasks => [...prevTasks, newTask]);
  }


  function checkHandler(task) {
    const updatedTask = { ...task, done: !task.done };

    if (updatedTask.done) {
      updatedTask.checked = true;
      setPendingTasks((pendingTasks) => pendingTasks.map((t) => t.id === updatedTask.id ? updatedTask : t));
      setTimeout(() => {
        setCompletedTasks((completedTasks) => [...completedTasks, updatedTask]);
        setPendingTasks((pendingTasks) => pendingTasks.filter((t) => t.id !== updatedTask.id));


      }, 350);
    }
    else {
      updatedTask.checked = false;
      setCompletedTasks((completedTasks) => completedTasks.map((t) => t.id === updatedTask.id ? updatedTask : t));
      setTimeout(() => {
        setPendingTasks((pendingTasks) => [...pendingTasks, updatedTask]);
        setCompletedTasks((completedTasks) => completedTasks.filter((t) => t.id !== updatedTask.id));
      }
        , 350);
    }

  }

  const pendingRend = pendingTasks.map(task => (
    <Task
      name={task.text}
      id={task.id}
      key={task.id}
      checked={task.checked}
      onCheck={() => checkHandler(task)}
    />
  ));
  const completedRend = completedTasks.map(task => (
    <Task
      name={task.text}
      id={task.id}
      key={task.id}
      checked={task.checked}
      onCheck={() => checkHandler(task)}
    />
  ));
  const display = filter === 'completed' ? completedRend : pendingRend;
  const sessionHandler = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <h1>TO DO List</h1>
      <Form onAddTask={addTask} clearSession={sessionHandler} />
      <Filters filterHandler={filterHandler} />

      <div className="ms-5">
        <h2 style={{ textDecoration: 'underline' }}>
          {filter === 'completed' ? 'Completed Tasks' : 'Pending Tasks'}
        </h2>

        {display.length === 0 ? <h4>No Tasks Here Yet !</h4> : display}
      </div>
    </div>
  );
}

export default App;
