import React, { useEffect, useRef } from "react";
import Banner from "../assets/Hero.png";
import "../styles/HomePage.css";
import { Brush } from "@mui/icons-material";
import { CalendarToday } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const serviceItems = entry.target.querySelectorAll(".service-item");
          serviceItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("show");
            }, index * 400);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const currentServicesRef = servicesRef.current;

    if (currentServicesRef) {
      observer.observe(currentServicesRef);
    }

    return () => {
      if (currentServicesRef) {
        observer.unobserve(currentServicesRef);
      }
    };
  }, []);

  const iconStyle = {
    marginTop: "1rem",
    fontSize: "2.2rem",
    color: "#FF5733",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div className="page-container">
      <div className="home-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Discover Unique <span className="highlight">Handmade</span>{" "}
            Creations
          </h1>
          <p className="primary-text">
            Explore a world of one-of-a-kind art and craft, made by talented
            artists and crafters from around the globe. Support creators and
            find products with personal touches that can't be found anywhere
            else.
          </p>
          <button className="button" onClick={() => navigate("/artworks")}>
            Shop Now
          </button>
        </div>
        <div className="home-image-container">
          <img src={Banner} alt="Banner" className="home-banner-image" />
        </div>
      </div>
      <div className="services-section" ref={servicesRef}>
        <h2 className="services-heading">What Services We Offer</h2>
        <div className="services-list">
          <div className="service-item">
            <h3 className="service-title">Selling Artwork</h3>
            <Brush style={iconStyle} />{" "}
            <p>
              Browse our collection of unique, handmade artworks created by
              talented artists.
            </p>
          </div>
          <div className="service-item">
            <h3 className="service-title">Book Workshops </h3>
            <CalendarToday style={iconStyle} />
            <p>
              Join our workshops to learn from experienced artists and create
              your own masterpieces.
            </p>
            <span className="coming-soon">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
