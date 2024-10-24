import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../../context/AuthContext"
import TaskForm from "../Task/TaskForm"
import TaskList from "../Task/TaskList"
import { getTasks } from "../../utils/api"

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Full viewport height to center the form */
  background-color: #f4f6f9; /* Background color for the dashboard */
  padding: 2rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`

const TaskDashboard = () => {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)

  useEffect(() => {
    // const fetchTasks = async () => {
    //   const data = await getTasks()
    //   setTasks(data)
    // }
    // fetchTasks()
  }, [])

  const handleCreateTaskClick = () => {
    setShowTaskForm((prevShow) => !prevShow)
  }

  return (
    <DashboardWrapper>
      <h2>Task Dashboard</h2>

      <Button onClick={handleCreateTaskClick}>
        {showTaskForm ? "Close Task Form" : "Create Task"}
      </Button>

      {showTaskForm && <TaskForm userRole={JSON.stringify(user).role} />}

      <TaskList tasks={tasks} userRole={JSON.stringify(user).role} />
    </DashboardWrapper>
  )
}

export default TaskDashboard
