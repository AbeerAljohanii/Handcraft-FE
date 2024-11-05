import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import axios from "axios";
import "../../styles/UserProfile.css";

export default function UserProfile({ userData, setUserData }) {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    phoneNumber: userData.phoneNumber || "",
    role: userData.role || "Customer",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== userData[key]) {
        updatedFields[key] = formData[key];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      setErrorMessage("No changes made to update.");
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .patch("http://localhost:5125/api/v1/users/profile", updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          return axios.get("http://localhost:5125/api/v1/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      })
      .then((updatedUserData) => {
        setUserData(updatedUserData.data);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0];
          const formattedError = firstError.join(" and ");
          setErrorMessage(formattedError);
        } else if (typeof error.response.data === "string") {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage(`An error occurred: ${error.message}`);
        }
      });
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      phoneNumber: userData.phoneNumber || "",
      role: userData.role || "Customer",
    });
    setIsEditing(false);
  };

  const buttonStyles = {
    borderColor: "#603813",
    backgroundColor: "#603813",
    color: "white",
    "&:hover": {
      backgroundColor: "#5a331d",
    },
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => setErrorMessage("")}
          sx={{ marginBottom: 2 }}
        >
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          onClose={() => setSuccessMessage("")}
          sx={{ marginBottom: 2 }}
        >
          {successMessage}
        </Alert>
      )}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <div className="form-group">
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="submit-button"
            sx={buttonStyles}
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outlined"
            className="cancel-button"
            sx={{
              borderColor: "#603813 ",
              color: "#603813 ",
              mt: 1,
            }}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {formData.phoneNumber}
          </p>
          <p>
            <strong>Role:</strong> {formData.role}
          </p>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outlined"
            sx={buttonStyles}
            className="edit-button"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
