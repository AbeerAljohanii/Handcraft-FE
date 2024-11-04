import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import Artworks from "./components/artworks/Artworks";
import ArtworkDetail from "./components/artworkDetail/ArtworkDetails";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [artworkResponse, setArtworkResponse] = useState({
    artworks: [],
    totalCount: 0,
  });
  const [category, setCategory] = useState("All");

  // http://localhost:5125

  // page size 5 (number of artworks)
  // page number (page-1)* page size
  let pageSize = 2;
  let pageNumber = page;

  function getUrl(userInput) {
    let artworkUrl = `http://localhost:5125/api/v1/artworks?pageNumber=${pageNumber}&pageSize=${pageSize}&lowPrice=${minPrice}&highPrice=${maxPrice}`;
    if (userInput) {
      artworkUrl += `&search=${userInput}`;
    }
    return artworkUrl;
  }
  // const artworkApi = `http://localhost:5125/api/v1/artworks?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${userInput}&sortOrder=price_desc`;
  // logic for send request to th server:
  // 1. url
  // 2. method: get/post/put/delete
  // 3. response

  function getData() {
    setLoading(true);
    axios
      .get(getUrl(userInput))
      .then((response) => {
        setArtworkResponse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [pageNumber, userInput, minPrice, maxPrice]);

  // if (loading) {
  //   return <div> Please wait 1 second </div>;
  // }

  // if (error) {
  //   return <div> {error.message}</div>;
  // }

  console.log(artworkResponse);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "artworks",
          element: (
            <Artworks
              category={category}
              setCategory={setCategory}
              totalCount={artworkResponse.totalCount}
              page={page}
              handleChange={handleChange}
              artworkList={artworkResponse.artworks}
              artworksPerPage={pageSize}
              setUserInput={setUserInput}
              userInput={userInput}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          ),
        },
        {
          path: "artworks/:artworkId",
          element: <ArtworkDetail />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "*",
          element: <HomePage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
