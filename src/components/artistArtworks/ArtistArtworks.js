import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import ArtworkTable from "./ArtworkTable";
import ArtworkDialog from "./ArtworkDialog";
import { fetchItems, createItem, updateItem, deleteItem } from "../../api";
const ArtistArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);

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

  const getCategories = async () => {
    try {
      const response = await fetchItems("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetchItems("/artworks/my-artworks");
        setArtworks(response.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtworks();
    getCategories();
  }, []);

  const handleOpenDialog = (artwork) => {
    setSelectedArtwork(artwork);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedArtwork(null);
  };

  const handleChangeArtwork = (field, value) => {
    setSelectedArtwork((prevArtwork) => ({
      ...prevArtwork,
      [field]: value,
    }));
  };

  const handleSaveArtwork = async () => {
    setLoadingSave(true);
    const artworkToSend = {
      Title: selectedArtwork.title,
      Description: selectedArtwork.description,
      Quantity: selectedArtwork.quantity,
      Price: selectedArtwork.price,
      CategoryId: selectedArtwork.category?.id,
    };

    try {
      const response = await updateItem(
        "/artworks",
        selectedArtwork.id,
        artworkToSend
      );
      setArtworks((prev) =>
        prev.map((art) => (art.id === selectedArtwork.id ? response.data : art))
      );
      setDialogOpen(false);
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDeleteArtwork = async (id) => {
    try {
      await deleteItem("/artworks", id);
      setArtworks((prev) => prev.filter((art) => art.id !== id));
    } catch (error) {
      console.error("Error deleting artwork:", error.message);
    }
  };

  return (
    <Box p={3} sx={{ marginTop: "80px" }}>
      <Typography variant="h4" gutterBottom>
        My Artworks
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : artworks.length > 0 ? (
        <ArtworkTable
          artworks={artworks}
          handleOpenDialog={handleOpenDialog}
          handleDeleteArtwork={handleDeleteArtwork}
        />
      ) : (
        <Typography>No Artworks available</Typography>
      )}

      <ArtworkDialog
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        selectedArtwork={selectedArtwork}
        handleSaveArtwork={handleSaveArtwork}
        categories={categories}
        loadingSave={loadingSave}
        handleChangeArtwork={handleChangeArtwork}
      />
    </Box>
  );
};

export default ArtistArtworks;
