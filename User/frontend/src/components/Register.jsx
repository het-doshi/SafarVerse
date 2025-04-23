import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import registerImg from "../Images/register.png";
import userIcon from "../Images/user.png";
import OHeader from "./OHeader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 

    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        username,
        email,
        password,
      });

      console.log("Registration Successful:", response.data);
      navigate("/login");

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Server error";
      setErrorMessage(errorMsg); 
    }
  };

  return (
    <>
      <OHeader />
      <br />
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={registerImg} alt="" />
                </div>
                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Register</h2>

                  {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 

                  <Form onSubmit={handleRegister}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Username"
                        required
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn" type="submit">
                      Register
                    </Button>
                  </Form>
                  <p> Already have an account? <Link to="/login"> Login Here!</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
