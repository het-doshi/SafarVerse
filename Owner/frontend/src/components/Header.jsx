import React from "react";
import {Link, useNavigate} from "react-router-dom"
import "../styles/header.css";
import logo from "../Images/logo.png";
import UserIcon from "@mui/icons-material/AccountCircleOutlined";
const Header = (props) => {

  const navigate = useNavigate();
  const {userdata} = props;
  const username = userdata?.username || navigate("/"); 
  return (
    <>
      <div className="navBar">
      
        <img src={logo} alt="" className="hlogo" />

        <div className="brandName">SafarVerse</div>

        <ul>
          <UserIcon className="userIcon" fontSize="large"/>
          <li>
          <Link className="nav-links"  >{username}</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
