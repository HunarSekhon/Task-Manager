import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask, openEditSidebar }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          toggleTaskCompletion={toggleTaskCompletion} 
          deleteTask={deleteTask}
          openEditSidebar={openEditSidebar} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
