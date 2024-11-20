import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout";
import leaderboardData from "./components/leaderboard/leaderboardData";
import Multiplayer from "./routes/multiplayer/Multiplayer";
import Homepage from "./routes/homepage/Homepage";
import Leaderboard from "./components/leaderboard/Leaderbord";
import Game from "./components/singleplayer/Singleplayer";

import Selectoption from "./components/options/selectoptions";
import Singleplayer from "./components/singleplayer/Singleplayer";
import Records from "./components/Userrecords/User.records";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Layout />, // Render Layout component at the root path
      children: [
        {
          path: "/multiplayer",
          element: <Multiplayer />,
        },
        {
          path: "/homepage",
          element: <Homepage />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard data={leaderboardData} />, // Pass leaderboardData as prop
        },
        {
          path: "/singleplayer",
          element: <Singleplayer />,
        },
        {
          path: "/selectoption",
          element: <Selectoption/>,
        },
        {
          path:"/records1",
          element:<Records/>
        }
      ],
    },
    {
      path: "/records", // New parent path for Records
      element: <Records />, // Render Records at the /records path
    },
    {
      path: "/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
