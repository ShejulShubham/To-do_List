import React from 'react';

function TaskList({ tasks, onEdit, onDelete }){
  return (
    <tbody>
      {tasks && tasks.map((task) => (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.assigned_to}</td>
          <td>{task.status}</td>
          <td>{task.due_date}</td>
          <td>{task.priority}</td>
          <td>{task.comment}</td>
          <td>
            <button onClick={() => onEdit(task.id)} 
              className='btn btn-primary'>Edit</button>
            <button onClick={() => onDelete(task.id)}
              className='btn btn-warning'>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TaskList;