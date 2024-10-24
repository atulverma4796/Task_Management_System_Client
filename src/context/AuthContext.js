import React, { createContext, useState, useEffect } from "react"
import { getUser, loginUser, logoutUser } from "../utils/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const currentUser = await getUser()
          setUser(currentUser)
        } catch (err) {
          console.log("Failed to fetch user:", err)
          setError(err)
        }
      }
      setLoading(false)
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      const loggedInUser = await loginUser(email, password)
      setUser(loggedInUser)
    } catch (err) {
      console.error("Login failed:", err)
      setError(err)
    }
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
