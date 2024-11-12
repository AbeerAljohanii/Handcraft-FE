import React from "react";
import "../../styles/ExploreArtwork.css";

export default function ExploreArtwork({ categories, setCategory, category }) {
  return (
    <div className="explore-artwork" id="explore-artwork">
      <h1>Explore Handmade Masterpieces</h1>
      <p className="explore-artwork-text">
        Choose from a range of artisanal creations, each piece telling its own
        story of creativity and craftsmanship.
      </p>
      <div className="explore-artwork-list">
        {categories.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(item.categoryName)}
              key={index}
              className="explore-artwork-list-item"
            >
              <img
                className={item.categoryName === category ? "active" : ""}
                src={item.categoryUrl}
                alt={item.categoryName}
              />
              <p>{item.categoryName}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
