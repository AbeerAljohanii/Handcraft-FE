import React from "react";
import "../../styles/ExploreArtwork.css";
import { artCategories } from "../../assets/assets";

export default function ExploreArtwork({ category, setCategory }) {
  return (
    <div className="explore-artwork" id="explore-artwork">
      <h1>Explore Handmade Masterpieces</h1>
      <p className="explore-artwork-text">
        Choose from a range of artisanal creations, each piece telling its own
        story of creativity and craftsmanship.
      </p>
      <div className="explore-artwork-list">
        {artCategories.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category ? "All" : item.category
                )
              }
              key={index}
              className="explore-artwork-list-item"
            >
              <img
                className={category === item.category ? "active" : ""}
                src={item.image}
                alt={`${item.category}`}
              />
              <p>{item.category}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}
