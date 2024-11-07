import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const UserDialog = ({
  dialogOpen,
  handleCloseDialog,
  newItem,
  setNewItem,
  handleSaveUser,
  loadingSave,
  selectedItem,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>{selectedItem ? `Update User` : `Add New User`}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          margin="dense"
          type="text"
          value={newItem.name || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            console.log(newValue);
            setNewItem({ ...newItem, name: newValue });
          }}
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          margin="dense"
          type="text"
          value={newItem.phoneNumber || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setNewItem({ ...newItem, phoneNumber: newValue });
          }}
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="dense"
          type="email"
          value={newItem.email || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setNewItem({ ...newItem, email: newValue });
          }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSaveUser} color="primary" disabled={loadingSave}>
          {loadingSave ? "Saving..." : selectedItem ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
