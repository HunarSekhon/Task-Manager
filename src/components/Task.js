import React from 'react';

const Task = ({ task, toggleTaskCompletion, deleteTask, openEditSidebar }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)} 
      />
      <span>{task.title}</span>
      <p>{task.description}</p>
      <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
      <button className="edit" onClick={() => openEditSidebar(task)}>Edit</button>
    </li>
  );
};

export default Task;
