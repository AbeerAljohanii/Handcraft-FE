import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import ExploreArtwork from "../src/components/ExploreArtwork/ExploreArtwork";
import Artworks from "./components/artworks/Artworks";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
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
  let pageSize = 8;
  let pageNumber = page;
  const artworkApi = `http://localhost:5125/api/v1/artworks?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=price_desc`;

  console.log("Current Page:", page);
  console.log("Page Number:", pageNumber);
  console.log("API URL:", artworkApi);

  // const [loading, setLoading] = useState(true);

  // logic for send request to th server:
  // 1. url
  // 2. method: get/post/put/delete
  // 3. response

  function getData() {
    axios
      .get(artworkApi)
      .then((response) => {
        setArtworkResponse(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }

  useEffect(() => {
    getData();
  }, [pageNumber]);

  console.log(artworkResponse);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ExploreArtwork category={category} setCategory={setCategory} />
          ),
        },
        {
          path: "artworks",
          element: (
            <Artworks
              totalCount={artworkResponse.totalCount}
              page={page}
              handleChange={handleChange}
              artworkList={artworkResponse.artworks}
            />
          ),
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
