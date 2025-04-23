import React from "react";
import OHeader from "./OHeader";
import "../styles/Home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../Images/hero-img01.jpg";
import heroVideo from "../Images/hero-video.mp4";
import heroImg02 from "../Images/hero-img02.jpg";
import ServiceList from "../components/services/ServiceList"
import experienceImg from "../Images/trip.png"
import Footer from "./Footer"
const OHome = () => {
  return (
    <>
      <OHeader />
     
      {/* intro */}
      <section className="intro">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <h1>
                  {" "}
                  <h3> A safar, Way to see the world </h3>{" "}
                  <span className="highlight">SafarVerse</span>
                </h1>
                <p>
                  Life is a journey, enjoy the trip. Aim for the sky, but move
                  slowly, enjoying every step along the way. It is all those
                  little steps that make the journey complete. The journey is a
                  reward.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* services */}
      <section>
          <Container className="hero__content">
            <Row>
              <Col lg="3">
                <h5 className="services__subtitle">
                  What we Serve
                </h5>
                <h2 className="services__title">
                  We offer Best Services
                </h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
         </section>
         
         {/* experience */}
         <section className="exp">
            <Container>
              <Row>
                <Col lg='6'>
                  <div className="experience__content">
                    <h5 className="services__subtitle">
                    Experience
                </h5>
                    <h2>
                      With our all experience <br/> we will serve you.
                    </h2>
                    <p>
                    Traveling , it leaves you speechless, then turns you into a storyteller.
                    <br/>
                    We travel, some of us forever, to seek other states, other lives, other souls.
                    </p>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="experience__img">
                    <img src={experienceImg} alt="" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

         <Footer/>

    </>
  );
};

export default OHome;
