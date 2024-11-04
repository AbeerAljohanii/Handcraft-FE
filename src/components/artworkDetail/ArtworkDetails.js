import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import "./ArtworkDetails.css"; 

export default function ArtworkDetails() {
  const { artworkId } = useParams();
  const [ArtworkDetail, setArtworkDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ArtworkDetailUrl = `http://localhost:5125/api/v1/artworks/${artworkId}`;

  function fetchArtworkDetail() {
    axios
      .get(ArtworkDetailUrl)
      .then((response) => {
        setArtworkDetail(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError("Error");
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchArtworkDetail();
  }, [artworkId]);

  // function addToFav(product) {
  //   const isInclude = wishList.some((item) => item.id === product.id);
  //   if (!isInclude) {
  //     setWishList([...wishList, product]);
  //     setIsFavorited(true);
  //   }
  // }

  if (loading) {
    return (
      <div className="artwork-details-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="artwork-details-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="artwork-details-container">
      <h1 className="artwork-title">{ArtworkDetail.title}</h1>
      <p className="artwork-description">{ArtworkDetail.description}</p>
      <p className="artwork-price">{ArtworkDetail.price} $</p>
      {/* <img src={ArtworkDetail.imageUrl} alt={ArtworkDetail.title} className="artwork-image" /> */}
      <Link to="/artworks">
        <Button className="back-button">Go back</Button>
      </Link>
      {/* <FavoriteIcon
        onClick={() => addToFav(artwork)}
        className="favorite-icon"
      /> */}
    </div>
  );
}