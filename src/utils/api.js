const API_URL = "http://localhost:3001/api"

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  return response.json()
}

export const loginUser = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const { token, user } = await response.json()
  localStorage.setItem("token", token)
  return user
}

export const logoutUser = async () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const getUser = async () => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error(errorText)
  }

  return response.json()
}

export const getTasks = async () => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  return response.json()
}

export const createTask = async (task) => {
  const token = localStorage.getItem("token")
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
}

export const getFieldPermissions = async (role) => {
  const response = await fetch(`${API_URL}/permissions/${role}`)
  if (!response.ok) {
    throw new Error("Failed to fetch permissions")
  }
  return response.json()
}

export const updateFieldPermissions = async (permissions) => {
  const response = await fetch(`/api/permissions/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permissions),
  })
  if (!response.ok) {
    throw new Error("Failed to update permissions")
  }
  return response.json()
}
