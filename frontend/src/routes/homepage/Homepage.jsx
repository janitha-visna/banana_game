import styles from "./homepage.module.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.imageContainer}>
        <img
          src="public/images/bananaimg.webp"
          alt="Homepage Illustration"
          className={styles.homepageImage}
        />
      </div>
      <div className={styles.content}>
        <h1>Welcome to the Game !</h1>
        <h2>
          {" "}
          This is a fun and interactive quiz game where players answer questions
          to earn points.
        </h2>
        <h2>The game ends when your chances run out or the rounds is up.</h2>
        <h3>You may need to create a user account to play.</h3>

        <div
          className={styles.box}
          onClick={() => handleClick("/login")} // Navigate to Component1
        >
          Log In
        </div>
      </div>
    </div>
  );
}

export default Homepage;
