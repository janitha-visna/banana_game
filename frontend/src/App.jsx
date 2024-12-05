import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import hook
import Homepage from "./routes/homepage/Homepage";
import Leaderboard from "./components/leaderboard/Leaderbord";
import Game from "./components/singleplayer/Singleplayer";
import Selectoption from "./components/options/Selectoptions";
import Records from "./components/Userrecords/UserRecords";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import NotFound from "./components/Notfound/Notfound";
import leaderboardData from "./components/leaderboard/leaderboardData";
import Playgame from "./routes/Playgame/Playegame";
import ImageUpload from "./components/imageupload/ImageUpload";

const App = () => {
  const { RequireAuth } = useAuth(); // Access RequireAuth

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />, // Public route
    },
    // Protected Routes
    {
      path: "/leaderboard",
      element: (
        <RequireAuth>
          <Leaderboard data={leaderboardData} />
        </RequireAuth>
      ),
    },
    {
      path: "/play",
      element: (
        <RequireAuth>
          <Playgame />
        </RequireAuth>
      ),
    },
    {
      path: "/singleplayer",
      element: (
        <RequireAuth>
          <Game />
        </RequireAuth>
      ),
    },
    {
      path: "/selectoption",
      element: (
        <RequireAuth>
          <Selectoption />
        </RequireAuth>
      ),
    },
    {
      path: "/records",
      element: (
        <RequireAuth>
          <Records />
        </RequireAuth>
      ),
    },
    {
      path: "/upload",
      element: (
        <RequireAuth>
          <ImageUpload />
        </RequireAuth>
      ),
    },
    // Authentication Routes
    {
      path: "/login",
      element: <Login />, // Public route
    },
    {
      path: "/register",
      element: <Register />, // Public route
    },
    // Catch-all route
    {
      path: "*",
      element: <NotFound />, // Public route
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
