import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import ArtworkTable from "../../components/artistArtworks/ArtworkTable";
import ArtworkDialog from "../artistArtworks/ArtworkDialog";
import UserTable from "./user/UserTable";
import UserDialog from "./user/UserDialog";
import OrderTable from "./order/OrderTable";
import OrderDialog from "./order/OrderDialog";
import { fetchItems, updateItem, deleteItem } from "../../api";

const Dashboard = () => {
  const [items, setItems] = useState([]); // This will store Artworks, Users, or Orders
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]); // For Artworks only
  const [loadingSave, setLoadingSave] = useState(false);
  const [activeSection, setActiveSection] = useState("artworks");
  const [newItem, setNewItem] = useState({});

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

  // Reusable Fetch Function
  const loadItems = async (section) => {
    try {
      const response = await fetchItems(`${section}`);
      if (section === "users" || section === "orders") {
        setItems(response.data);
      } else {
        setItems(response.data[section]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // artwork
  const handleSaveArtwork = async () => {
    setLoadingSave(true);
    let itemToSend = {
      Title: selectedItem.title,
      Description: selectedItem.description,
      Quantity: selectedItem.quantity,
      Price: selectedItem.price,
      CategoryId: selectedItem.category?.id,
    };
    try {
      const response = await updateItem(
        `${activeSection}`,
        selectedItem.id,
        itemToSend
      );
      setItems((prev) =>
        prev.map((art) => (art.id === selectedItem.id ? response.data : art))
      );
      handleCloseDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };
  // user
  const handleSaveUser = async () => {
    let itemToSend = {
      name: newItem.name,
      phoneNumber: newItem.phoneNumber,
      email: newItem.email,
    };

    setLoadingSave(true);

    try {
      const response = await updateItem("users", newItem.id, itemToSend);
      if (response.status === 204) {
        setItems((prevItems) =>
          prevItems.map((user) =>
            user.id === newItem.id ? { ...user, ...itemToSend } : user
          )
        );
      }
      handleCloseDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  // order
  const handleSaveOrder = async () => {
    let itemToSend = {
      orderId: newItem.orderId,
      totalAmount: newItem.totalAmount,
      shippingAddress: newItem.shippingAddress,
      createdAt: newItem.createdAt,
      user: {
        name: newItem.user.name,
        phoneNumber: newItem.user.phoneNumber,
        email: newItem.user.email,
      },
      orderDetails: newItem.orderDetails.map((detail) => ({
        product: detail.product,
        quantity: detail.quantity,
        price: detail.price,
      })),
    };
    setLoadingSave(true);

    try {
      const response = await updateItem("orders", newItem.id, itemToSend);
      if (response.status === 204) {
        setItems((prevItems) =>
          prevItems.map((order) =>
            order.id === newItem.id ? { ...order, ...itemToSend } : order
          )
        );
      }
      handleCloseDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  // Reusable Delete Function
  const handleDeleteItem = async (section, id) => {
    try {
      await deleteItem(section, id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  // Handle Dialog Open/Close
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setNewItem((prev) => ({ ...prev, ...item }));
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
    resetItemForm();
  };

  const handleChangeArtwork = (field, value) => {
    setSelectedItem((prevArtwork) => ({
      ...prevArtwork,
      [field]: value,
    }));
  };

  // Categories (Artworks only)
  const getCategories = () => {
    fetchItems("categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const resetItemForm = () => {
    setNewItem(() => {
      if (activeSection === "users") {
        return {
          name: "",
          phoneNumber: "",
          email: "",
          role: "",
        };
      } else if (activeSection === "orders") {
        return {
          orderId: "", // ID of the order
          totalAmount: 0, // Total price of the order
          shippingAddress: "", // Address for shipping
          createdAt: new Date().toISOString(), // Creation date (default to current date)
          user: {
            name: "", // Customer name
            phoneNumber: "", // Customer phone number
            email: "", // Customer email
          },
          orderDetails: [
            // Array to handle multiple items in an order
            {
              product: "", // Product title or ID
              quantity: 1, // Quantity ordered
              price: 0, // Price per item
            },
          ],
        };
      }
      return {};
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsLoading(true);
    setItems([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadItems(activeSection);
      if (activeSection === "artworks") {
        getCategories();
      }
      setIsLoading(false);
      console.log(items);
    };
    fetchData();
  }, [activeSection]);

  return (
    <Box p={3} sx={{ marginTop: "80px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box mb={3}>
        <Button
          onClick={() => handleSectionChange("artworks")}
          variant={activeSection === "artworks" ? "contained" : "outlined"}
        >
          Artworks
        </Button>
        <Button
          onClick={() => handleSectionChange("users")}
          variant={activeSection === "users" ? "contained" : "outlined"}
          sx={{ ml: 2 }}
        >
          Users
        </Button>
        <Button
          onClick={() => handleSectionChange("orders")}
          variant={activeSection === "orders" ? "contained" : "outlined"}
          sx={{ ml: 2 }}
        >
          Orders
        </Button>
      </Box>

      {activeSection === "artworks" && (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : // Ensure 'items' is not empty and is in the expected format
          items && items.length > 0 ? (
            <ArtworkTable
              artworks={items} // Same component for Artworks, Users, and Orders
              handleOpenDialog={handleOpenDialog}
              handleDeleteArtwork={handleDeleteItem}
            />
          ) : (
            // If no items are available, show a message
            <Typography>No artworks available</Typography>
          )}

          <ArtworkDialog
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            selectedArtwork={selectedItem}
            handleSaveArtwork={handleSaveArtwork}
            categories={categories}
            loadingSave={loadingSave}
            handleChangeArtwork={handleChangeArtwork}
          />
        </>
      )}

      {activeSection === "users" && (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : items && items.length > 0 ? (
            <UserTable
              users={items}
              handleOpenDialog={handleOpenDialog}
              handleDeleteItem={handleDeleteItem}
            />
          ) : (
            // If no items are available, show a message
            <Typography>No users available</Typography>
          )}

          <UserDialog
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            newItem={newItem}
            setNewItem={setNewItem}
            selectedItem={selectedItem}
            handleSaveUser={handleSaveUser}
            loadingSave={loadingSave}
          />
        </>
      )}

      {activeSection === "orders" && (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : items && items.length > 0 ? (
            <OrderTable
              orders={items}
              handleOpenDialog={handleOpenDialog}
              handleDeleteItem={handleDeleteItem}
            />
          ) : (
            // If no items are available, show a message
            <Typography>No orders available</Typography>
          )}

          <OrderDialog
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            newItem={newItem}
            setNewItem={setNewItem}
            selectedItem={selectedItem}
            handleSaveOrder={handleSaveOrder}
            loadingSave={loadingSave}
          />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
