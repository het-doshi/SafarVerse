import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Label, Input, FormGroup } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/content.css"
import Post from './Post'

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state?.responseData;

  useEffect(() => {
    if (!responseData) {
      navigate("/");
    }
  }, [responseData, navigate]); 

  const email = responseData?.email || "";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image) {
      toast.error("All fields are required!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createTip",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error submitting tip");
    }
  };


  const cemail = responseData.email;
    
    // State to store tips
    const [tips, setTips] = useState([]);

    // Fetch tips when component loads
    useEffect(() => {
        const fetchTips = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/getTips?email=${cemail}`);
            setTips(response.data);
          } catch (error) {
            console.error("Error fetching tips:", error);
          }
        };
      
        fetchTips();
      },); 
      

  if (!responseData) return null; 

  return (
    <>
      <Header userdata={responseData} />
      <ToastContainer />
      <Sidebar responseData={responseData} />
      <Form onSubmit={handleSubmit}
         style={{ width: "550px", marginTop: "80px", marginLeft: "270px", position:"fixed" }} >
       
            <h1>Manage your content here !</h1>
            <FormGroup>
            <Label for="title">Title</Label>
            <Input  id="title"  name="title"  placeholder="Enter your title"  type="text" value={formData.title} onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
            <Label for="description">Description</Label>
            <Input id="description" name="description" placeholder="Write your description"
                type="textarea" value={formData.description} onChange={handleChange}/>
            </FormGroup>

            <FormGroup>
            <Label for="image">Image of place</Label>
            <Input id="image" name="image" type="file" onChange={handleFileChange} />
            </FormGroup>

            <button className="btn btn-success" type="submit"> Submit</button>
      </Form>

      <div className="ph">
        <h4>All Listed Posts</h4>
        <hr />
      </div>

      <div className="posts">
        {tips.length > 0 ? (
          tips.map((tip) => <Post id={tip.id} currentUser={cemail} email={tip.email} title={tip.title} description={tip.description} image={tip.image} />)
        ) : (
          <p className="text-center text-gray-500">nothing is posted.</p>
        )}
      </div>

    </>
  );
};

export default Content;
