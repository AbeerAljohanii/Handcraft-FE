import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../api";

export default function UserRegister() {
  const [userRegister, setUserRegister] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: name === "email" ? value.toLowerCase() : value, // Force email to lowercase
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    createItem("/users/signup", userRegister)
      .then((response) => {
        if (response.status === 201) {
          setSuccess("Registration successful!");
          setUserRegister({
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
            role: "",
          });
          setError("");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors)[0];
          const formattedError = firstError.join(" and ");
          setError(formattedError);
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            name="role"
            value={userRegister.role}
            onChange={handleChange}
          >
            <MenuItem value="Customer">User</MenuItem>
            <MenuItem value="Artist">Artist</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, backgroundColor: "#603813" }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
