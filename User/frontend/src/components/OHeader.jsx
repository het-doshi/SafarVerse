import React, { useRef, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import logo from "../Images/logo.png";

const OHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navBar">
        <img src={logo} className="hlogo" />
        <ul className="oul">
          {" "}
          <li>
            <Link className="nav-links" to="/ohome">
              Home
            </Link>
          </li>
        </ul>
        <div className="brandName">SafarVerse</div>
        <button className="login" onClick={() => navigate("/login")}>
          {" "}
          Login{" "}
        </button>
        <button className="registration" onClick={() => navigate("/register")}>
          {" "}
          Register{" "}
        </button>
      </div>
    </>
  );
};

export default OHeader;
