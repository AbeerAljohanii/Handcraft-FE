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
  handleChangeArtwork,
}) => {
  if (!selectedArtwork) {
    return null; // Don't render the dialog if no artwork is selected
  }

  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Update Artwork</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          value={selectedArtwork.title || ""}
          onChange={(e) => handleChangeArtwork("title", e.target.value)} // Call parent handler
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          value={selectedArtwork.description || ""}
          onChange={(e) => handleChangeArtwork("description", e.target.value)} // Call parent handler
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          margin="dense"
          type="number"
          value={selectedArtwork.quantity || ""}
          onChange={(e) => handleChangeArtwork("quantity", e.target.value)} // Call parent handler
          required
        />
        <TextField
          fullWidth
          label="Price"
          margin="dense"
          type="number"
          value={selectedArtwork.price || ""}
          onChange={(e) => handleChangeArtwork("price", e.target.value)} // Call parent handler
          required
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={selectedArtwork.category?.id || ""}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (category) => category.id === e.target.value
              );
              handleChangeArtwork("category", selectedCategory); // Call parent handler
            }}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={handleSaveArtwork}
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
