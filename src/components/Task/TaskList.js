import React from "react"

const TaskList = ({ tasks, userRole }) => {
  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Assigned User: {task.assignedUser}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
