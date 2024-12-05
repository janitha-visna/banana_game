import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import hook
import Homepage from "./routes/homepage/Homepage";
import Multiplayer from "./routes/multiplayer/Multiplayer";
import Leaderboard from "./components/leaderboard/Leaderbord";
import Game from "./components/singleplayer/Singleplayer";
import Selectoption from "./components/options/Selectoptions";
import Records from "./components/Userrecords/UserRecords"
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import NotFound from "./routes/Notfound/Notfound";
import leaderboardData from "./components/leaderboard/leaderboardData";
import Playgame from "./routes/Playgame/Playegame";

// Debugging: Log components to ensure they are properly imported
console.log("Homepage:", Homepage); // Should log the function/component definition
console.log("Multiplayer:", Multiplayer);
console.log("Leaderboard:", Leaderboard);
console.log("Game:", Game);
console.log("Selectoption:", Selectoption);
console.log("Records:", Records);
console.log("Login:", Login);
console.log("Register:", Register);
console.log("NotFound:", NotFound);

const App = () => {
  const { RequireAuth } = useAuth(); // Access RequireAuth

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />, // Public route
    },
    {
      path: "/multiplayer",
      element: <Multiplayer />, // Public route
    },
    {
      path: "/leaderboard",
      element: <Leaderboard data={leaderboardData} />, // Public route
    },
    {
      path:"/play",
      element: <Playgame/>,
    },
    // Protected Routes
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
