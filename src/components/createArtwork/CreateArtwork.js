import React, { useState, useEffect } from "react";
import { uploadFile, fetchItems } from "../../api";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Container,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function CreateArtwork() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null); // For storing the selected image file
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetchItems("/categories");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send to the backend (including the image file)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("artworkUrl", image);

    try {
      // Send the form data to the backend
      const response = await uploadFile("/artworks", formData);
      if (response.status === 200) {
        setAlertMessage("Artwork successfully created!");
        setOpenSnackbar(true);

        // Reset form fields
        setTitle("");
        setDescription("");
        setQuantity(1);
        setPrice(0);
        setCategoryId("");
        setImage(null);
        setImagePreview(null);
        setErrors({});
      } else {
        console.error("Error creating artwork:", response.statusText);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error uploading artwork:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: "9rem" }}>
      <Box my={4}>
        <Typography variant="h4" gutterBottom align="center">
          Create New Artwork
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {alertMessage}
          </Alert>
        </Snackbar>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              error={!!errors.Title}
              helperText={errors.Title ? errors.Title[0] : ""}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              error={!!errors.Description}
              helperText={errors.Description ? errors.Description[0] : ""}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                name="quantity"
                value={quantity}
                error={!!errors.Quantity}
                helperText={errors.Quantity ? errors.Quantity[0] : ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                fullWidth
              />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                name="price"
                value={price}
                error={!!errors.Price}
                helperText={errors.Price ? errors.Price[0] : ""}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
                fullWidth
              />
            </Stack>
            <FormControl fullWidth required error={!!errors.CategoryId}>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Category"
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.CategoryId
                  ? errors.CategoryId[0]
                  : "Select a category for your artwork"}
              </FormHelperText>
            </FormControl>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ marginTop: 2 }}
              error={!!errors.ArtworkUrl}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                name="artworkUrl"
                onChange={handleImageChange}
              />
            </Button>
            {errors.ArtworkUrl && (
              <FormHelperText error>{errors.ArtworkUrl[0]}</FormHelperText>
            )}
            {/* Optional Image Preview */}
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Create Artwork
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
