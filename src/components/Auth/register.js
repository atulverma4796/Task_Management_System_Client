import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../utils/api"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`

const Message = styled.p`
  color: ${(props) => (props.error ? "red" : "green")};
  margin-bottom: 1rem;
`

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Employee")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = { username, password, role }

    try {
      const response = await registerUser(userData)
      console.log(response)
      setSuccess("Registration successful! Please log in.")
      setError("")
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)
      setError("Registration failed. Please try again.")
      setSuccess("")
    }
  }

  return (
    <Container>
      <FormContainer>
        <Title>Register</Title>
        {error && <Message error>{error}</Message>}
        {success && <Message>{success}</Message>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </Select>
          <Button type="submit">Register</Button>
        </form>
      </FormContainer>
    </Container>
  )
}

export default Register
