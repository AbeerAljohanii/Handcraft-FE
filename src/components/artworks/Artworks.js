import React from "react";
import ArtworkPagination from "./ArtworkPagination";
import "./Artwork.css";
import ExploreArtwork from "../ExploreArtwork/ExploreArtwork";
import Form from "../form/Form";
import PriceRangeForm from "../form/PriceRangeForm";
import { Link } from "react-router-dom";

export default function Artworks({
  category,
  setCategory,
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
  return (
    <div className="artworks-container">
      <ExploreArtwork category={category} setCategory={setCategory} />
      <Form setUserInput={setUserInput} />
      <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      <div className="artworks-content">
        <div className="artworks-section">
          <h2 className="artworks-title">Available Artworks</h2>
          <div className="artworks-list">
            {artworkList.map((artwork) => (
              <Link
                to={`${artwork.id}`}
                key={artwork.id}
                className="artwork-item"
              >
                <h3 className="artwork-title">{artwork.title}</h3>
                <p className="artwork-price">Price: SR{artwork.price}</p>
                <p className="artwork-quantity">Quantity: {artwork.quantity}</p>
                <p className="artwork-category">
                  Category: {artwork.category.name}
                </p>
                <p className="artwork-artist">Artist: {artwork.user.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <br />
        <ArtworkPagination
          totalCount={totalCount}
          page={page}
          handleChange={handleChange}
          artworksPerPage={artworksPerPage}
          userInput={userInput}
        />
      </div>
    </div>
  );
}
