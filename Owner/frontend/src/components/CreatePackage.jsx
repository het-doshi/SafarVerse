import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CreatePackage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const responseData = location.state?.responseData;
    
    useEffect(() => {
        if (!responseData) {
            navigate("/");
        }
    }, [responseData, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        place: "",
        price: "",
        description: "",
        days : "",
        startDay : "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.place || !formData.price || !formData.days  || !formData.startDay || !formData.description || !formData.image) {
            toast.error("All fields are required!");
            return;
        }
        
        const data = new FormData();
        data.append("ownerId", responseData?.id);
        data.append("name", formData.name);
        data.append("place", formData.place);
        data.append("price", formData.price);
        data.append("days", formData.days);
        data.append("startDay", formData.startDay);
        data.append("description", formData.description);
        data.append("image", formData.image);
  

        try {
            const response = await axios.post("http://localhost:5000/api/createPackage", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success(response.data.message || "Package Created Successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to create package");
        }
    };

    return (
        <>
            <Header userdata={responseData} />
            <ToastContainer/>
            <Sidebar responseData={responseData} />
            
            <Form onSubmit={handleSubmit} style={{ width: "900px", marginTop: "80px", marginLeft: "270px", position: "absolute" }}>
                <h4>Create Your Package Here!</h4>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input id="name" name="name" placeholder="Enter package name" type="text" value={formData.name} onChange={handleChange} required />
                </FormGroup>
                
                <FormGroup>
                    <Label for="place">Place</Label>
                    <Input id="place" name="place" placeholder="Enter place name" type="text" value={formData.place} onChange={handleChange} required />
                </FormGroup>

                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input id="price" name="price" placeholder="Enter price" type="number" value={formData.price} onChange={handleChange} required />
                </FormGroup>

                <FormGroup>
                    <Label for="days">Days</Label>
                    <Input id="days" name="days" placeholder="Enter no of days" type="number" value={formData.days} onChange={handleChange} required />
                </FormGroup>

                <FormGroup>
                    <Label for="startDay">Begining Date</Label>
                    <Input id="startDay" name="startDay" placeholder="tour starting date" type="date" value={formData.startDay} onChange={handleChange} required />
                </FormGroup>


                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input id="description" name="description" placeholder="Write your description" type="textarea" value={formData.description} onChange={handleChange} required />
                </FormGroup>
    
                <FormGroup>
                    <Label for="image">Cover Image for Package</Label>
                    <Input id="image" name="image" type="file" onChange={handleFileChange} required />
                </FormGroup>
    
                <button className="btn btn-success" type="submit">Submit</button>
            </Form>
        </>
    );
};

export default CreatePackage;
