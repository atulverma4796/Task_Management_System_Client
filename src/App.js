import React, { useContext } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import { AuthContext } from "./context/AuthContext" // Adjust path as necessary
import Navbar from "./components/Navbar"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/register"
import TaskDashboard from "./components/Dashboard/TaskDashboard"
import ManagePermissions from "./components/Admin/ManagePermissions"

const App = () => {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div>
        <Navbar />
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={user ? <TaskDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/manage-permissions"
          element={
            user && user.role === "Admin" ? (
              <ManagePermissions />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  )
}

export default App
