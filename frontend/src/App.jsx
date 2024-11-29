import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout";
import leaderboardData from "./components/leaderboard/leaderboardData";
import Multiplayer from "./routes/multiplayer/Multiplayer";
import Homepage from "./routes/homepage/Homepage";
import Leaderboard from "./components/leaderboard/Leaderbord";
import Game from "./components/singleplayer/Singleplayer";
import NotFound from "./routes/Notfound/Notfound";
import Selectoption from "./components/options/Selectoptions";
import Singleplayer from "./components/singleplayer/Singleplayer";
import Records from "./components/Userrecords/User.records";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />, // Homepage as the default route
    },
    {
      path: "/multiplayer",
      element: <Multiplayer />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard data={leaderboardData} />,
    },
    {
      path: "/singleplayer",
      element: <Game />,
    },
    {
      path: "/selectoption",
      element: <Selectoption />,
    },
    {
      path: "/records1",
      element: <Records />,
    },
    {
      path: "/records", // Separate records path if needed
      element: <Records />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    //catch all route for unmatched paths
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;