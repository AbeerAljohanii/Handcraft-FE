import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createItem } from "../../api";

export default function Order() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cartList = JSON.parse(localStorage.getItem("cartList")) || [];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Map cartList to OrderDetails structure
    const orderDetails = cartList.map((artwork) => ({
      ArtworkId: artwork.id,
      Quantity: artwork.currentQuantity,
    }));

    // Prepare the order data
    const orderData = {
      ShippingAddress: address,
      OrderDetails: orderDetails,
    };

    try {
      const response = await createItem("orders/add", orderData);

      if (response.status === 201) {
        console.log("Order submitted successfully:", response.data);
        localStorage.removeItem("cartList");
        navigate("/order-confirmation");
      } else {
        setError("Failed to submit the order. Please try again later.");
      }
    } catch (error) {
        console.log(error)
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).join(" and ")
        : error.response?.data || error.message;
      setError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        padding: "30px",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "10rem",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Shipping Address
      </Typography>

      <Paper
        sx={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Shipping Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
          />

          <Divider sx={{ marginBottom: "20px" }} />

          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>

          <Box sx={{ marginBottom: "20px" }}>
            {cartList.map((artwork) => (
              <Box
                key={artwork.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="body1">
                  {artwork.title} x {artwork.currentQuantity}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {artwork.price} SR
                </Typography>
              </Box>
            ))}
          </Box>

          {error && (
            <Alert severity="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              padding: "12px",
              backgroundColor: "#603813",
              "&:hover": {
                backgroundColor: "#4b2c12",
              },
            }}
          >
            Submit Order
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
