import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import styled from "styled-components"

const StyledNav = styled.nav`
  background-color: #282c34;
  padding: 1rem;
`

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
`

const StyledListItem = styled.li`
  color: white;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <StyledNav>
      <StyledList>
        {user ? (
          <>
            <StyledListItem>
              <Link to="/dashboard">Dashboard</Link>
            </StyledListItem>
            {user.role === "Admin" && (
              <StyledListItem>
                <Link to="/manage-permissions">Manage Permissions</Link>
              </StyledListItem>
            )}
            <StyledListItem>
              <button onClick={logout}>Logout</button>
            </StyledListItem>
          </>
        ) : (
          <>
            <StyledListItem>
              <Link to="/login">Login</Link>
            </StyledListItem>
            <StyledListItem>
              <Link to="/register">Register</Link>
            </StyledListItem>
          </>
        )}
      </StyledList>
    </StyledNav>
  )
}

export default Navbar
