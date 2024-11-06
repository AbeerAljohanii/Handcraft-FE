import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import Artworks from "./components/artworks/Artworks";
import ArtworkDetail from "./components/artworkDetail/ArtworkDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import UserProfile from "./components/user/UserProfile";
import ProtectedRoute from "./components/user/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ArtistArtworks from "./components/artistArtworks/ArtistArtworks";

function App() {
  const [userInput, setUserInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // User Profile
  const [userData, setUserData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // user
  // step 1: send token => return the data
  // token is valid
  // extract user information=> front

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5125/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setIsAuthenticated(true);
        setIsUserDataLoading(false);
      })
      .catch((error) => {
        setIsUserDataLoading(false);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  // protected route
  useEffect(() => {
    setIsAuthenticated(userData ? true : false);
  }, [userData]);

  if (loading) {
    return <div> Please wait 1 second </div>;
  }

  if (error) {
    return <div> {error.message}</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userData={userData}
          setUserData={setUserData}
        />
      ),
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
          path: "home",
          element: <HomePage />,
        },
        {
          path: "signin",
          element: <UserLogin getUserData={getUserData} />,
        },
        {
          path: "signup",
          element: <UserRegister />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isUserDataLoading={isUserDataLoading}
              element={
                <UserProfile userData={userData} setUserData={setUserData} />
              }
            />
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isUserDataLoading={isUserDataLoading}
              shouldCheckAdmin={true}
              userData={userData}
              element={<Dashboard />}
            />
          ),
        },
        {
          path: "/my-artworks",
          element: (
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isUserDataLoading={isUserDataLoading}
              shouldCheckArtist={true}
              userData={userData}
              element={<ArtistArtworks />}
            />
          ),
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
