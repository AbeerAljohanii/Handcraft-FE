import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const OrderDialog = ({
  dialogOpen,
  handleCloseDialog,
  newItem,
  setNewItem,
  handleSaveOrder,
  loadingSave,
  selectedItem,
}) => {
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>
        {selectedItem ? `Update Order` : `Add New Order`}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Shipping Address"
          margin="dense"
          type="text"
          value={newItem.shippingAddress || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setNewItem({ ...newItem, shippingAddress: newValue });
          }}
          required
        />
        <TextField
          fullWidth
          label="Total Amount"
          margin="dense"
          type="number"
          value={newItem.totalAmount || ""}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            console.log(newValue);
            setNewItem({ ...newItem, totalAmount: newValue });
          }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={handleSaveOrder}
          color="primary"
          disabled={loadingSave}
        >
          {loadingSave ? "Saving..." : selectedItem ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
