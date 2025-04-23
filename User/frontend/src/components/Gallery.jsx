import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import "../styles/gallery.css";
import imageupload from "../Images/imgeUploader.png";

Modal.setAppElement("#root"); 

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const responseData = location.state?.responseData || navigate("/");
  const email = responseData?.user?.email;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [images, setImages] = useState([]);

  
  // Fetch images when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/getPhotos", { email });
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to load images!");
      }
    };
    fetchImages();
  }, [email]);

  const refresh = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/getPhotos", { email });
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images!");
    }
  };


  const Delete = async (pic) => {
    try {
        const response = await axios.delete(`http://localhost:4000/api/deletePhoto?id=${pic.id}`); 
        toast.success(response.data.message);
        refresh(); 
    } catch (error) {
        console.error("Error deleting:", error);
        toast.error("Error deleting picture");
    }
};



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setIsModalOpen(true); // Open modal on file selection
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
      setSelectedFile(null);
      setPreview(null);
      setIsModalOpen(false); // Close modal on successful upload
      refresh()

    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image!");
    }
  };

  return (
    <>
      <Header userdata={responseData} />
      <ToastContainer />

      <p className="tagline">SafarVerse Gallery: Where Every Journey Finds Its Frame. 📸</p>

      <div className="upload">
        <img src={imageupload} className="uploadLogo"/>

        <div className="uploadfile">
          <input
            type="file"
            placeholder="Browse"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
      </div>


      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Preview"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "500px",
            height: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center",
          },
        }}
      >
        <h3>Preview Image</h3>
        <img
          src={preview}
          alt="Preview"
          style={{ maxHeight: "300px", width: "400px", objectFit: "contain" }}
        />
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpload} style={{ marginRight: "10px" }}>
            OK
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      {/* Image Display Section */}
      <div className="gallery-container">
        {images.length > 0 ? (
          images.map((pic, index) => (
            <div key={index} className="gallery-card">
              <img src={pic.image} alt={`Uploaded ${index}`} className="gallery-image" />
              <button className="deleteButton"  onClick={() => { Delete(pic) }} >Delete</button>
            </div>
          ))
        ) : (
          <p className="no-images">No images uploaded yet.</p>
        )}
      </div>

    </>   
  );
};

export default Gallery;
