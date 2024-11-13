import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { fetchItemById } from "../../api";

export default function ArtworkDetails({ userData }) {
  const { artworkId } = useParams();
  const [artworkDetail, setArtworkDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Retrieve cartList from localStorage
  const getCartList = () => {
    const cartData = localStorage.getItem("cartList");
    return cartData ? JSON.parse(cartData) : [];
  };

  const [cartList, setCartList] = useState(getCartList);

  function fetchArtworkDetail() {
    fetchItemById(`artworks`, artworkId)
      .then((response) => {
        setArtworkDetail(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchArtworkDetail();
  }, [artworkId]);

  // Update cartList and localStorage when an item is added
  function addToCart() {
    if (
      artworkDetail &&
      !cartList.some((item) => item.id === artworkDetail.id)
    ) {
      const updatedCart = [
        ...cartList,
        { ...artworkDetail, currentQuantity: 1 },
      ];
      setCartList(updatedCart);
      localStorage.setItem("cartList", JSON.stringify(updatedCart));
      setAlertMessage(`${artworkDetail.title} added to cart!`);
      setAlertSeverity("success");
    } else {
      setAlertMessage(`${artworkDetail.title} already in cart!`);
      setAlertSeverity("error");
    }
    setOpenSnackbar(true);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      maxWidth="600px"
      margin="0 auto"
      paddingTop="7rem"
    >
      {/* Snackbar for alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Show loading spinner while fetching */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Show error if there's a problem fetching the data */}
      {error && (
        <Typography variant="body1" color="error" mt={2} textAlign="center">
          Oops! Looks like the backend's on strike. Rerun it, ya developer!
        </Typography>
      )}

      {/* Show artwork details if available */}
      {!loading && !error && artworkDetail ? (
        <>
          <Typography variant="h4" mt={2} mb={2} color="#054C42">
            {artworkDetail.title}
          </Typography>
          <Box
            component="img"
            src={artworkDetail.artworkUrl}
            alt={artworkDetail.title}
            width="100%"
            maxHeight="400px"
            sx={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <Typography variant="body1" mt={2} mb={1} color="text.secondary">
            {artworkDetail.description}
          </Typography>
          <Typography variant="h6" mt={1}>
            Price: {artworkDetail.price} SR
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Category: {artworkDetail.category?.categoryName}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Artist: {artworkDetail.user?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Quantity: {artworkDetail.quantity}
          </Typography>

          {userData.role === "Customer" && (
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={addToCart}
              sx={{
                backgroundColor: "#054C42",
                color: "#fff",
                fontWeight: "bold",
                mt: 3,
                width: "100%",
                py: 1,
                fontSize: "1rem",
              }}
            >
              Add to Basket
            </Button>
          )}
        </>
      ) : (
        !loading &&
        !error && (
          <Typography variant="body1" color="error" mt={2}>
            Artwork not found!
          </Typography>
        )
      )}

      <Link to="/artworks" style={{ textDecoration: "none" }}>
        <Button variant="outlined" sx={{ mt: 2 }}>
          Go back
        </Button>
      </Link>
    </Box>
  );
}
