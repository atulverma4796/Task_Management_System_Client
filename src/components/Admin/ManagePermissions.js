import React, { useEffect, useState } from "react"
import { getFieldPermissions, updateFieldPermissions } from "../../utils/api" // Ensure these functions are defined in your API utils

const ManagePermissions = () => {
  const [permissions, setPermissions] = useState({})
  const [error, setError] = useState(null) // Error state

  useEffect(() => {
    const fetchPermissions = async () => {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) {
        // Ensure user is authenticated
        try {
          const data = await getFieldPermissions(user.role) // Pass the user role
          setPermissions(data)
        } catch (err) {
          setError(err.message)
        }
      } else {
        setError("User is not authenticated.")
      }
    }

    fetchPermissions()
  }, [])

  const handleChange = (role, field, type) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: {
          ...prev[role][field],
          [type]: !prev[role][field][type],
        },
      },
    }))
  }

  const handleSave = async () => {
    try {
      await updateFieldPermissions(permissions)
      alert("Permissions updated successfully")
    } catch (err) {
      setError("Error updating permissions: " + err.message)
    }
  }

  return (
    <div>
      <h2>Manage Field Permissions</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Error display */}
      {Object.keys(permissions).length > 0 ? (
        Object.keys(permissions).map((role) => (
          <div key={role}>
            <h3>{role}</h3>
            {Object.keys(permissions[role]).map((field) => (
              <div key={field}>
                <label>
                  <input
                    type="checkbox"
                    checked={permissions[role][field].viewable}
                    onChange={() => handleChange(role, field, "viewable")}
                  />
                  View {field}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={permissions[role][field].editable}
                    onChange={() => handleChange(role, field, "editable")}
                  />
                  Edit {field}
                </label>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading permissions...</p>
      )}
      <button onClick={handleSave}>Save Permissions</button>
    </div>
  )
}

export default ManagePermissions
