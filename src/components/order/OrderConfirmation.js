import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #603813, #A5978B, #054C42)",
        textAlign: "center",
        paddingTop: "3rem",
        paddingBottom: "5rem",
        position: "relative",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#333" }}>
          Thank You for Your Order!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginTop: "20px",
            color: "#666",
            fontSize: "18px",
            fontWeight: 500,
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          Your order has been successfully submitted. We’re preparing it for
          shipping and will send you a confirmation email shortly.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "30px",
            padding: "10px 30px",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: 600,
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.5)",
            "&:hover": {
              backgroundColor: "#007bff",
              boxShadow: "0 6px 20px rgba(0, 123, 255, 0.7)",
            },
          }}
          onClick={() => navigate("/home")}
        >
          Go to Home
        </Button>
      </Paper>
    </Box>
  );
}
