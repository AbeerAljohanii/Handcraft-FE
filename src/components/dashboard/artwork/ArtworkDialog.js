import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ArtworkDialog = ({
  dialogOpen,
  handleCloseDialog,
  handleSaveArtwork,
  selectedArtwork,
  categories,
  loadingSave,
}) => {
  const [artwork, setArtwork] = useState(null);

  // Only update artwork when selectedArtwork changes and it's not null
  useEffect(() => {
    if (selectedArtwork) {
      setArtwork({ ...selectedArtwork });
    }
  }, [selectedArtwork]);

  const handleChange = (field, value) => {
    console.log(`Changing ${field} to`, value); // Log the changes
    setArtwork((prevArtwork) => ({
      ...prevArtwork,
      [field]: value,
    }));
  };

  if (!artwork) {
    return null; // Don't render the dialog if artwork is null or undefined
  }

  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Update Artwork</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          value={artwork.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          value={artwork.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          margin="dense"
          type="number"
          value={artwork.quantity || ""}
          onChange={(e) => handleChange("quantity", e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Price"
          margin="dense"
          type="number"
          value={artwork.price || ""}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={artwork.category?.id || ""}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (category) => category.id === e.target.value
              );
              handleChange("category", selectedCategory);
            }}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={() => handleSaveArtwork(artwork)} // Pass the updated artwork to the save function
          color="primary"
          disabled={loadingSave}
        >
          {loadingSave ? "Saving..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArtworkDialog;
