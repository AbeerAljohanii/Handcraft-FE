import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import ExploreArtwork from "../src/components/ExploreArtwork/ExploreArtwork";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("All");
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
