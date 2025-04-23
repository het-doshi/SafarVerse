import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import { Form, Label, Input, FormGroup } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTip = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const responseData = location.state?.responseData || navigate('/');
    const email = responseData?.user?.email;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
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
            const response = await axios.post("http://localhost:4000/api/createTip", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.error || "Error submitting tip");
        }
    };

    return (
        <>
            <Header userdata={responseData} />
            <ToastContainer />
            <Form onSubmit={handleSubmit} style={{ width: "900px", marginTop: "80px", marginLeft: "300px" }}>
                <br />
                <h1>Post your tip !</h1>
                <br />
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" name="title" placeholder="Enter your title" type="input" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input id="description" placeholder="Write your description" name="description" type="textarea" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image of place</Label>
                    <Input id="image" name="image" type="file" onChange={handleFileChange} />
                </FormGroup>
                <button className="btn btn-success" type="submit">Submit</button>
            </Form>
        </>
    );
};

export default CreateTip;
