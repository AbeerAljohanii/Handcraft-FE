import React, { useEffect } from "react";
import ArtworkPagination from "./ArtworkPagination";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import ExploreArtwork from "../ExploreArtwork/ExploreArtwork";
import Form from "../form/Form";
import PriceRangeForm from "../form/PriceRangeForm";
import { Link } from "react-router-dom";

export default function Artworks({
  category,
  setCategory,
  categories,
  totalCount,
  handleChange,
  page,
  artworkList,
  artworksPerPage,
  setUserInput,
  userInput,
  setMinPrice,
  setMaxPrice,
}) {
  const filteredArtworkList =
    category === "All"
      ? artworkList.filter((artwork) => artwork.quantity > 0) // Exclude artworks with 0 quantity
      : artworkList.filter((artwork) => {
          console.log(artwork.category?.categoryName); // Log categoryName for debugging
          return (
            artwork.category?.categoryName === category && artwork.quantity > 0
          );
        });

  return (
    <Box
      className="artworks-container"
      sx={{
        padding: "2rem",
        paddingTop: "6rem",
        textAlign: "center",
      }}
    >
      <ExploreArtwork
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <Form setUserInput={setUserInput} />
      <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />

      <Box
        className="artworks-content"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          className="artworks-section"
          sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
        >
          {filteredArtworkList.length === 0 ? (
            <Typography variant="h5" sx={{ color: "#888", marginTop: "2rem" }}>
              No artworks available matching your criteria.
            </Typography>
          ) : (
            <>
              <Typography
                variant="h4"
                component="h2"
                sx={{ marginBottom: "2rem", marginTop: "2rem", color: "#333" }}
              >
                Available Artworks
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1.5rem",
                  minHeight: "33vh",
                }}
              >
                {filteredArtworkList.map((artwork) => (
                  <Link
                    to={`${artwork.id}`}
                    key={artwork.id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card
                      sx={{
                        width: 300,
                        height: 500,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={artwork.artworkUrl}
                        alt={artwork.title}
                        sx={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          padding: "1.5rem",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.5rem",
                            color: "#333",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {artwork.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "1rem", marginTop: "0.25rem" }}
                        >
                          Price: {artwork.price} SR
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "1rem", marginTop: "0.25rem" }}
                        >
                          Quantity: {artwork.quantity}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "1rem", marginTop: "0.25rem" }}
                        >
                          Category: {artwork.category?.categoryName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "1rem", marginTop: "0.25rem" }}
                        >
                          Artist: {artwork.user?.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <ArtworkPagination
            totalCount={totalCount}
            page={page}
            handleChange={handleChange}
            artworksPerPage={artworksPerPage}
            userInput={userInput}
          />
        </Box>
      </Box>
    </Box>
  );
}
