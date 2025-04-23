import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import Chart from "./chart";
import Package from "./Package";
import '../styles/home.css'
import { Card, CardBody, CardTitle, CardSubtitle,} from "reactstrap";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state?.responseData;
  
  useEffect(() => {
    if (!responseData) {
      navigate("/");
    }
  }, [responseData, navigate]);

  
  const [packs, setPacks] = useState([]);
  const owner = responseData?.id;

  useEffect(() => {
    if (!owner) return; 

    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getPackage?owner=${owner}`
        );
        setPacks(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [owner]);

  return (
    <>
      <Header userdata={responseData} />
      <Sidebar responseData={responseData} />
      <div className="highlights">
      
        <Card style={{ width: "15rem", height:"8rem", background:"#969595", border: "0px" }}>
          <CardBody>
           <HomeWorkRoundedIcon fontSize="large"/>
            <CardTitle tag="h5">Packages</CardTitle>
            <CardSubtitle className="mb-2 " tag="h5">10</CardSubtitle>
          </CardBody>
        </Card>

        <Card style={{ width: "15rem", height:"8rem", background:"#969595", border: "0px" }}>
          <CardBody>
          <CalendarMonthOutlinedIcon fontSize="large"/>
            <CardTitle tag="h5">Bookings</CardTitle>
            <CardSubtitle className="mb-2 " tag="h5">80</CardSubtitle>
          </CardBody>
        </Card>

        <Card style={{ width: "15rem", height:"8rem", background:"#969595", border: "0px" }}>
          <CardBody>
          <PaymentsIcon fontSize="large"/>
            <CardTitle tag="h5">Total Revenue</CardTitle>
            <CardSubtitle className="mb-2 " tag="h5">₹90,000</CardSubtitle>
          </CardBody>
        </Card>

      </div>
      
      <div className="chart">
      <Card style={{ width: "23rem", height:"28rem", background:"#2e4059", border: "0px" }} >
      <CardBody>
      <Chart className="chart" />
      </CardBody>
      </Card>
      </div>


      <div className="dispayedPackages">
      {packs.length > 0 ? (
          packs.map((pack) => <Package  name={pack.name} place={pack.place}  image={pack.image} />)
        ) : (
          <p className="text-center text-gray-500">no packages are listed.</p>
        )}
      </div>
     

    </>
  );
};

export default Home;
