import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
