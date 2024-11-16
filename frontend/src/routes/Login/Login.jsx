import "./login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for message
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const { login } = useAuth(); // Get the login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Ensures cookies are included in the request
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login Successful");
        setMessageType("success");

        // Save user data using AuthContext (no need to save token as it is in cookie)
        login(data.user);

        console.log("User saved to localStorage.");
        console.log("data object", data);
      } else {
        setMessage(data.message || "Login Failed");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;