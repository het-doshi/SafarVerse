import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  CardSubtitle,
  Input,
  Label,
  Button
} from "reactstrap";
import "../styles/register.css";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/"); 
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <CardBody className="cardBody">
          <CardTitle className="loginTittle" tag="h2">Register</CardTitle>

          <CardSubtitle className="mb-2 tagline" tag="h6">
            Join the Journey <br /> Manage, List, and Grow with Safarverse!
          </CardSubtitle>

          <br />
          <img className="imgl" src={logo} alt="logo"/>
          <br />
         <CardSubtitle className="mb-2 text-muted stitle" tag="h6"> SafarVerse </CardSubtitle>

          <Form className="rform" onSubmit={handleRegister}>

            <FormGroup>
              <Label for="username" hidden>Username</Label>
              <Input id="username" name="username" placeholder="Username" type="text" value={formData.username}
                onChange={handleChange} style={{ width: "70%", marginLeft: "80px" }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email" hidden>Email</Label>
              <Input id="email" name="email" placeholder="Email" type="email" value={formData.email}
                onChange={handleChange} style={{ width: "70%", marginLeft: "80px" }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" hidden>Password</Label>
              <Input id="password" name="password" placeholder="Password" type="password" value={formData.password}
                onChange={handleChange} style={{ width: "70%", marginLeft: "80px" }}
              />
            </FormGroup>

            <Button className="submit" color="success" type="submit">Register</Button>
            <Button className="submit" color="primary" onClick={() => navigate("/")}>Login</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Register;
