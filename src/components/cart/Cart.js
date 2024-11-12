import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  // Retrieve cartList from localStorage and parse it
  const [cartList, setCartList] = useState(() => {
    const savedCartList = localStorage.getItem("cartList");
    return savedCartList ? JSON.parse(savedCartList) : [];
  });

  // Calculate the total price of items in the cart
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.currentQuantity,
    0
  );

  const handleCheckout = () => {
    navigate("/order");
  };

  // Remove item from cart function
  const removeFromCart = (artworkId) => {
    const updatedCart = cartList.filter((artwork) => artwork.id !== artworkId);
    setCartList(updatedCart);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  // Increase quantity logic, ensuring it doesn't exceed available stock
  const increaseQuantity = (artworkId) => {
    const updatedCart = cartList.map((artwork) =>
      artwork.id === artworkId
        ? artwork.currentQuantity < artwork.quantity
          ? { ...artwork, currentQuantity: artwork.currentQuantity + 1 }
          : artwork
        : artwork
    );
    setCartList(updatedCart);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  // Decrease quantity logic
  const decreaseQuantity = (artworkId) => {
    const updatedCart = cartList.map((artwork) =>
      artwork.id === artworkId && artwork.currentQuantity > 1
        ? { ...artwork, currentQuantity: artwork.currentQuantity - 1 }
        : artwork
    );
    setCartList(updatedCart);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
  };

  return (
    <Box sx={{ padding: "20px", paddingTop: "9rem" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "#333",
          marginBottom: "40px",
        }}
      >
        Your Cart
      </Typography>
      {cartList.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {cartList.map((artwork) => (
              <Card
                key={artwork.id}
                sx={{
                  width: "300px",
                  position: "relative",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  alt={artwork.title}
                  image={artwork.artworkUrl}
                  sx={{ objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                />
                <CardContent sx={{ padding: "16px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {artwork.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "5px" }}
                  >
                    {artwork.category?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ marginTop: "10px", fontWeight: 700 }}
                  >
                    Price: {artwork.price} SR
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      justifyContent: "center", // Align buttons in the center
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => decreaseQuantity(artwork.id)}
                      sx={{
                        marginRight: "10px",
                        borderRadius: "20px",
                        padding: "5px 15px",
                      }}
                      disabled={artwork.currentQuantity <= 1}
                    >
                      -
                    </Button>
                    <Typography variant="h6" sx={{ margin: "0 10px" }}>
                      {artwork.currentQuantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => increaseQuantity(artwork.id)}
                      sx={{
                        marginLeft: "10px",
                        borderRadius: "20px",
                        padding: "5px 15px",
                      }}
                      disabled={artwork.currentQuantity >= artwork.quantity}
                    >
                      +
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      onClick={() => removeFromCart(artwork.id)}
                      sx={{
                        backgroundColor: "#e74c3c",
                        borderRadius: "20px",
                        padding: "5px 15px",
                        "&:hover": {
                          backgroundColor: "#c0392b",
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{
                backgroundColor: "#054C42",
                borderRadius: "20px",
                padding: "10px 30px",
                "&:hover": {
                  backgroundColor: "#043b33",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            marginTop: "50px",
            backgroundColor: "#f9f9f9", // Light background for better contrast
            padding: "40px 20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FaHeartBroken style={{ fontSize: "80px", color: "#e74c3c" }} />
          <Typography
            variant="h4"
            sx={{
              marginTop: "20px",
              fontWeight: 700,
              color: "#333",
              fontSize: "24px",
            }}
          >
            Oops..!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: "10px",
              color: "#777",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Your cart is empty. Explore artworks and add them to your cart.
          </Typography>
          <Button
            onClick={() => navigate("/artworks")}
            variant="outlined"
            sx={{
              marginTop: "30px",
              padding: "10px 30px",
              borderRadius: "30px",
              borderColor: "#603813",
              color: "#603813",
              fontWeight: 600,
              fontSize: "16px",
              "&:hover": {
                borderColor: "#603813",
                backgroundColor: "#603813",
                color: "#fff",
              },
            }}
          >
            Go to Artwork
          </Button>
        </Box>
      )}
    </Box>
  );
}
