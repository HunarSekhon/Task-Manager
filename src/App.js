import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import Sidebar from './components/Sidebar';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);  // Manages sidebar visibility
  const [taskToEdit, setTaskToEdit] = useState(null);  // Holds the task being edited

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const saveTask = (id, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  // Function to open the sidebar for editing
  const openEditSidebar = (task) => {
    setTaskToEdit(task);  // Set the task to edit
    setSidebarOpen(true);  // Open the sidebar
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);  // Close the sidebar
    setTaskToEdit(null);  // Clear the task data
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Active') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <Filter setFilter={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        toggleTaskCompletion={toggleTaskCompletion} 
        deleteTask={deleteTask} 
        openEditSidebar={openEditSidebar}  // Pass down the function to TaskList
      />
      
      {/* Conditionally render the Sidebar */}
      {sidebarOpen && (
        <Sidebar 
          sidebarOpen={sidebarOpen}
          task={taskToEdit} 
          closeSidebar={closeSidebar} 
          saveTask={saveTask} 
        />
      )}
    </div>
  );
};

export default App;
