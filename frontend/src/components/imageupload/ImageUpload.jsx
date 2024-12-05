import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null); // To hold the selected image
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To track errors

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Check if file is larger than 5MB
        setError("File size should be less than 5MB.");
        return;
      }
      setImage(file);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", image); // Appending the selected image to the form data

    try {
      setLoading(true);
      setError(""); // Reset error before starting the upload

      // Replace the backend URL directly here
      const response = await axios.post(
        "http://localhost:8800/api/users/images/upload-image", // Direct backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Automatically sends cookies with the request
        }
      );

      // Handle successful upload
      const { message, user } = response.data;
      console.log(message, user); // Log the message and the updated user

      // Optionally, update local storage or state with the new image URL
      localStorage.setItem("userImage", user.imageUrl); // Save the image URL in localStorage
      alert(message);
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload">
      <h2>Upload Profile Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ImageUpload;
