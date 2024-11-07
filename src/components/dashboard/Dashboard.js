import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ArtworkTable from "../../components/artistArtworks/ArtworkTable";
import ArtworkDialog from "./artwork/ArtworkDialog";
import UserTable from "./user/UserTable";
import UserDialog from "./user/UserDialog";

const API_URL = "http://localhost:5125/api/v1";

const Dashboard = () => {
  const [items, setItems] = useState([]); // This will store Artworks, Users, or Orders
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]); // For Artworks only
  const [loadingSave, setLoadingSave] = useState(false);
  const [activeSection, setActiveSection] = useState("artworks");

  const [newItem, setNewItem] = useState(() => {
    if (activeSection === "users") {
      return {
        name: "",
        phoneNumber: "",
        email: "",
      };
    } else if (activeSection === "orders") {
      return {
        orderId: "",
        product: "",
        quantity: 0,
        price: 0,
      };
    }
    return {};
  });

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
  const fetchItems = async (section) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/${section}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (section === "users") {
        console.log(response);
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

  // Reusable Save Function
  const handleSaveItem = async (section, item) => {
    console.log("Attempting to save item with id:", item);
    if (!item.id) {
      console.error("Item ID is undefined. Cannot make PATCH request.");
      return;
    }
    let itemToSend;

    if (section === "users") {
      itemToSend = {
        name: item.name,
        phoneNumber: item.phoneNumber,
        email: item.email,
      };
    } else if (section === "artworks") {
      itemToSend = {
        Title: item.title,
        Description: item.description,
        Quantity: item.quantity,
        Price: item.price,
        CategoryId: item.category?.id, // For Artworks only
      };
    } else if (section === "orders") {
      itemToSend = {
        orderId: item.orderId,
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      };
    }

    if (!itemToSend) {
      console.error("Item data is missing");
      return;
    }
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    setLoadingSave(true);

    try {
      const response = await axios.patch(
        `${API_URL}/${section}/${item.id}`,
        itemToSend,
        { headers }
      );

      setItems((prev) =>
        prev.map((art) => (art.id === item.id ? response.data : art))
      );
      handleCloseDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleSaveUser = async () => {
    let itemToSend = {
      name: newItem.name,
      phoneNumber: newItem.phoneNumber,
      email: newItem.email,
    };

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    setLoadingSave(true);

    try {
      const response = await axios.patch(
        `${API_URL}/users/${newItem.id}`,
        itemToSend,
        { headers }
      );

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

  // Reusable Delete Function
  const handleDeleteItem = async (section, id) => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`${API_URL}/${section}/${id}`, { headers });
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

  // Categories (Artworks only)
  const getCategories = () => {
    axios
      .get("http://localhost:5125/api/v1/categories")
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
          orderId: "",
          product: "",
          quantity: 0,
          price: 0,
        };
      }
      return {};
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      if (activeSection === "artworks") {
        await fetchItems("artworks");
        getCategories();
      } else if (activeSection === "users") {
        await fetchItems("users");
      } else if (activeSection === "orders") {
        await fetchItems("orders");
      }
      setIsLoading(false);
    };

    loadItems();
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
          ) : (
            <ArtworkTable
              artworks={items} // Same component for Artworks, Users, and Orders
              handleOpenDialog={handleOpenDialog}
              handleDeleteItem={handleDeleteItem}
            />
          )}

          <ArtworkDialog
            dialogOpen={dialogOpen}
            handleCloseDialog={handleCloseDialog}
            selectedArtwork={selectedItem}
            handleSaveArtwork={(item) => handleSaveItem("artworks", item)}
            categories={categories}
            loadingSave={loadingSave}
          />
        </>
      )}

      {activeSection === "users" && (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <UserTable
              users={items}
              handleOpenDialog={handleOpenDialog}
              handleDeleteItem={handleDeleteItem}
            />
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
        <Typography variant="h5">Orders Section</Typography>
        // Add Orders Section content here
      )}
    </Box>
  );
};

export default Dashboard;
