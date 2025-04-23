import React, { useRef, useEffect, useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import "../styles/Header.css";
import logo from "../Images/logo.png";
import{Button} from "reactstrap"
const Header = (props) => {

  const navigate = useNavigate();
  const {userdata} = props;
  const username = userdata?.user?.username || navigate("/"); 
  return (
    <>
      <div className="navBar">
      
        <img src={logo} className="hlogo" />

        <div className="brandName">SafarVerse</div>

        <ul>
          <li>
          <Link className="nav-links" to="/home" state={{ responseData: userdata}} >Home</Link>
          </li>
          <li>
          <Link className="nav-links"  to="/tours" state={{ responseData: userdata}}>Tours</Link>
          </li>
          <li>
          <Link className="nav-links" to="/tips" state={{ responseData: userdata}} >tips</Link>
          </li>
          <li>
          <Link className="nav-links" to="/gallery" state={{ responseData: userdata}} >Gallery</Link>
          </li>
          <li>
          <Link className="nav-links" to="/home" state={{ responseData: userdata}} >{username}</Link>
          </li>
        </ul>
            <button onClick={() => navigate('/OHome')} className="logout"> Logout </button>
      </div>
    </>
  );
};

export default Header;
