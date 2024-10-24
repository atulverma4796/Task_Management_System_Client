import React, { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { loginUser } from "../../utils/api"

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const FormContainer = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setAuthData } = useContext(AuthContext)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({ username, password })
      console.log(response)
      localStorage.setItem("user", JSON.stringify(response))
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      console.error("Login error:", err)
    }
  }

  return (
    <LoginContainer>
      <FormContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit">Login</Button>
        </Form>
      </FormContainer>
    </LoginContainer>
  )
}

export default Login
