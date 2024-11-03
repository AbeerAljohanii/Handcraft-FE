import React from "react";
import ArtworkPagination from "./ArtworkPagination";
import "./Artwork.css";
import ExploreArtwork from "../ExploreArtwork/ExploreArtwork";
import Form from "../form/Form";
import PriceRangeForm from "../form/PriceRangeForm";

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
        <div className="products-section">
          <h2 className="products-title">Available Artworks</h2>
          <div className="products-list">
            {artworkList.map((artwork, index) => (
              <div key={artwork.id} className="product-item">
                <h3 className="product-title">{artwork.title}</h3>
                <p className="product-price">Price: SR{artwork.price}</p>
                <p className="product-quantity">Quantity: {artwork.quantity}</p>
                <p className="product-category">
                  Category: {artwork.category.name}
                </p>
                <p className="product-artist">Artist: {artwork.user.name}</p>
              </div>
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
