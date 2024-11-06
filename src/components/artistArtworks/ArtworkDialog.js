import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ArtworkDialog = ({
  dialogOpen,
  handleCloseDialog,
  newArtwork,
  setNewArtwork,
  handleSaveArtwork,
  loadingSave,
  selectedArtwork,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>
        {selectedArtwork ? "Update Artwork" : "Add New Artwork"}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          margin="dense"
          value={newArtwork.title || ""}
          onChange={(e) =>
            setNewArtwork({ ...newArtwork, title: e.target.value })
          }
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          value={newArtwork.description || ""}
          onChange={(e) =>
            setNewArtwork({ ...newArtwork, description: e.target.value })
          }
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          margin="dense"
          type="number"
          value={newArtwork.quantity || ""}
          onChange={(e) =>
            setNewArtwork({ ...newArtwork, quantity: e.target.value })
          }
          required
        />
        <TextField
          fullWidth
          label="Price"
          margin="dense"
          type="number"
          value={newArtwork.price || ""}
          onChange={(e) =>
            setNewArtwork({ ...newArtwork, price: e.target.value })
          }
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={handleSaveArtwork}
          color="primary"
          disabled={loadingSave}
        >
          {loadingSave ? "Saving..." : selectedArtwork ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArtworkDialog;
