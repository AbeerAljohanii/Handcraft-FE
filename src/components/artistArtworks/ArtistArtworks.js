import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ArtworkTable from "./ArtworkTable";
import ArtworkDialog from "./ArtworkDialog";

const API_URL = "http://localhost:5125/api/v1/artworks";

const ArtistArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
  });

  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleError = (error) => {
    if (error.response?.data?.errors) {
      const firstError = Object.values(error.response.data.errors)[0]; // Get the first array of errors
      const formattedError = firstError.join(" and "); // Join messages with " and "
      console.log(formattedError); // Set the formatted error message
    } else if (typeof error.response.data === "string") {
      console.log(error.response.data);
    } else {
      console.log(`An error occurred: ${error.message}`);
    }
  };

  const fetchArtworks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/my-artworks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtworks(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (artwork = null) => {
    setSelectedArtwork(artwork);
    setNewArtwork(
      artwork || {
        title: "",
        description: "",
        quantity: "",
        price: "",
      }
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedArtwork(null);
    resetArtworkForm();
  };

  const resetArtworkForm = () => {
    setNewArtwork({
      title: "",
      description: "",
      quantity: "",
      price: "",
    });
  };

  const handleSaveArtwork = async () => {
    const artworkToSend = {
      ...newArtwork,
    };
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    setLoadingSave(true);

    try {
      const url = selectedArtwork
        ? `${API_URL}/${selectedArtwork.id}`
        : `${API_URL}`;
      const method = selectedArtwork ? "patch" : "post";

      const response = await axios[method](url, artworkToSend, { headers });

      console.log(response.data);

      if (selectedArtwork) {
        setArtworks((prev) =>
          prev.map((art) =>
            art.id === selectedArtwork.id ? response.data : art
          )
        );
      } else {
        setArtworks((prev) => [...prev, response.data]);
      }

      handleCloseDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDeleteArtwork = async (id) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API_URL}/${id}`, { headers });
      setArtworks((prev) => prev.filter((art) => art.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Box p={3} sx={{ marginTop: "80px" }}>
      <Typography variant="h4" gutterBottom>
        My Artworks
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 3 }}
      >
        Add New Artwork
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <ArtworkTable
          artworks={artworks}
          handleOpenDialog={handleOpenDialog}
          handleDeleteArtwork={handleDeleteArtwork}
        />
      )}

      <ArtworkDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        newArtwork={newArtwork}
        setNewArtwork={setNewArtwork}
        handleSaveArtwork={handleSaveArtwork}
        loadingSave={loadingSave}
        selectedArtwork={selectedArtwork}
      />
    </Box>
  );
};

export default ArtistArtworks;
