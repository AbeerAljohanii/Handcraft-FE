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

export default function UserLogin({ getUserData }) {
  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setuserLogin({ ...userLogin, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const userUrl = "http://localhost:5125/api/v1/users/signin";
    axios
      .post(userUrl, userLogin)
      .then((response) => {
        if (response.status === 200) {
          setSuccess("Login successful!"); // didn't implement yet
          localStorage.setItem("token", response.data);
        }
      })
      .then(() => {
        getUserData();
      })
      .then(() => {
        navigate("/home");
      })
      .then(() => {
        // Reset fields
        setuserLogin({
          email: "",
          password: "",
        });
        setError("");
      })
      .catch((error) => {
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
        User Login
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
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          name="email"
          helperText="Enter your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userLogin.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          helperText="Enter your password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userLogin.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Don't have an account?{" "}
        <Typography
          component="span"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "primary.main",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Typography>
      </Typography>
    </Box>
  );
}
