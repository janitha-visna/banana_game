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
        <div
          className={styles.box}
          onClick={() => handleClick("/login")} // Navigate to Component1
        >
          Login In
        </div>
      </div>
    </div>
  );
}

export default Homepage;
