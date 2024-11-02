import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout";
import leaderboardData from "./components/leaderboard/leaderboardData";
import Multiplayer from "./routes/multiplayer/Multiplayer";
import Homepage from "./routes/homepage/Homepage";
import Leaderboard from "./components/leaderboard/Leaderbord";


function App() {
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Layout/>, // Render Layout component at the root path
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
