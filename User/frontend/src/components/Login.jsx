import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import loginImg from '../Images/login.png';
import userIcon from '../Images/user.png';
import OHeader from './OHeader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        navigate('/home',{ state: { responseData: response.data } }); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <>
      <OHeader />
      <br />
      <section>
        <Container>
          <Row>
            <Col lg='8' className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg} alt='' />
                </div>
                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Login</h2>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <Form onSubmit={handleLogin}>
                    <FormGroup>
                      <input 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </FormGroup>
                    <FormGroup>
                      <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                      />
                    </FormGroup>
                    <Button className="btn secondary__btn auth__btn" type="submit">
                      Login
                    </Button>
                  </Form>
                  <p> Don't have an account? <Link to='/register'> Register Here!</Link></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
