import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { createTask, getFieldPermissions } from "../../utils/api"

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
`

const Form = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 1.5rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#fff")};
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#fff")};
  resize: none;
  height: 100px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "#fff")};
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`

const TaskForm = ({ userRole }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
    assignedUser: "",
  })
  const [fieldPermissions, setFieldPermissions] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
          const permissions = await getFieldPermissions(user.role)
          setFieldPermissions(permissions)
        }
      } catch (err) {
        setError("Failed to load field permissions.")
        console.error("Error fetching field permissions", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPermissions()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask((prevTask) => ({ ...prevTask, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask(task)
      setTask({
        title: "",
        description: "",
        status: "",
        dueDate: "",
        assignedUser: "",
      })
    } catch (err) {
      console.error("Error creating task", err)
    }
  }

  if (loading) {
    return <p>Loading form...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        {fieldPermissions.title && (
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            disabled={!fieldPermissions.title.editable}
            required={fieldPermissions.title.editable}
          />
        )}
        {fieldPermissions.description && (
          <TextArea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            disabled={!fieldPermissions.description.editable}
            required={fieldPermissions.description.editable}
          />
        )}
        {fieldPermissions.status && (
          <Select
            name="status"
            value={task.status}
            onChange={handleChange}
            disabled={!fieldPermissions.status.editable}
            required={fieldPermissions.status.editable}
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Select>
        )}
        {fieldPermissions.dueDate && (
          <Input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            disabled={!fieldPermissions.dueDate.editable}
            required={fieldPermissions.dueDate.editable}
          />
        )}
        {fieldPermissions.assignedUser && (
          <Input
            type="text"
            name="assignedUser"
            placeholder="Assigned User"
            value={task.assignedUser}
            onChange={handleChange}
            disabled={!fieldPermissions.assignedUser.editable}
            required={fieldPermissions.assignedUser.editable}
          />
        )}
        <Button type="submit">Create Task</Button>
      </Form>
    </FormWrapper>
  )
}

export default TaskForm
