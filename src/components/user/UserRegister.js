import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const userUrl = "http://localhost:5125/api/v1/users/signup";
    axios
      .post(userUrl, userRegister)
      .then((response) => {
        if (response.status === 200) {
          setSuccess("Registration successful!"); // didn't implement yet
          // Reset fields
          setUserRegister({
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
          });
          setError("");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0]; // Get the first array of errors
          const formattedError = firstError.join(" and "); // Join messages with " and "
          setError(formattedError); // Set the formatted error message
        } else if (typeof error.response.data === "string") {
          setError(error.response.data);
        } else {
          setError(`An error occurred: ${error.message}`);
        }
      });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: "400px",
        margin: "20rem auto 0 auto",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        User Register
      </Typography>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          sx={{ marginBottom: 2 }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          sx={{ marginBottom: 2 }}
        >
          {success}
        </Alert>
      )}
      <form onSubmit={handleRegister}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userRegister.name}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userRegister.phoneNumber}
          onChange={handleChange}
          helperText="Format: +9665XXXXXXXX"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userRegister.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userRegister.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
