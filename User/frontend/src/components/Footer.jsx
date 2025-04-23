import React from "react";
import "../styles/footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="SafarVerse Logo" />
              <p>
                Life is a journey, enjoy the trip. Aim for the sky, but move
                slowly, enjoying every step along the way. It is all those
                little steps that make the journey complete.
              </p>
            </div>
          </Col>
          <Col lg="3">
            <div className="contact">
              <p>Contact</p>
              <p>Address: Inida</p>
              <p>email:safarVerse2025@gmail.com</p>              
            </div>
          </Col>
        </Row>
        <p className='copyright'>Copyright {year} , Design and Developed by SafarVerse</p>
      </Container>
    </footer>
  );
};

export default Footer;

