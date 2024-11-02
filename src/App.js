import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import ExploreArtwork from "../src/components/ExploreArtwork/ExploreArtwork";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const url = "http://localhost:5125/"; // http://localhost:5125
  const artworkApi = "http://localhost:5125/api/v1/artworks";
  const [artworkList, setArtworkList] = useState({
    products: [],
    totalCount: 0,
  });
  const [category, setCategory] = useState("All");
  const [response, setResponse] = useState("");
  // const [loading, setLoading] = useState(true);

  // logic for send request to th server:
  // 1. url
  // 2. method: get/post/put/delete
  // 3. response

  function getData() {
    axios
      .get(artworkApi)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }

  useEffect(() => {
    getData();
  }, []);

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
