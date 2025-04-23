import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  CardSubtitle,
  Button
} from "reactstrap";
import "../styles/login.css";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const register = () => {navigate("/register")}

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });

      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/home',{ state: { responseData: response?.data?.owner } })
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>


      <ToastContainer />
      
      <Card>

        <CardBody className="cardBodyl">
          <CardTitle className="loginTittle" tag="h2"> Login </CardTitle>
          
          <CardSubtitle className="mb-2 tagline" tag="h6">
            Unlock Your Journey <br /> Manage, List, and Grow with Safarverse!
          </CardSubtitle>

          <br />
          <img src={logo} alt="logo" />
          <br />
          <CardSubtitle className="mb-2 text-muted subtitle" tag="h6"> SafarVerse </CardSubtitle>

          <Form className="loginform" onSubmit={handleLogin}>
            <FormGroup>
              <Label for="email" hidden> Email </Label>
              <Input
                id="email" name="email" placeholder="Email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} style={{ width: "70%", marginLeft: "80px" }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password" hidden> Password </Label>
              <Input
                id="password" name="password" placeholder="Password"type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                style={{ width: "70%", marginLeft: "80px" }}
              />
            </FormGroup>

            <Button className="submit" color="success" type="submit">Login</Button>
            <Button className="submit" color="dark" onClick={register}> Register</Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Login;
