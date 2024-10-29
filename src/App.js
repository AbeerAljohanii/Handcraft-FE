import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
        />
      ),
      children: [
        {
          path: "*",
          element: <NavBar />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
