import React, {useEffect, useState} from 'react'
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/managePackage.css"
import { Button } from "reactstrap"
import TourCard from './TourCard';
import axios from 'axios';

const ManagePackage = () => {

     const location = useLocation();
      const navigate = useNavigate();
      const responseData = location.state?.responseData;
    
      useEffect(() => {
        if (!responseData) {
          navigate("/");
        }
      }, [responseData, navigate]); 

      const createPackage = () => { 
        navigate("/createPackage", { state: { responseData } });
      };
    
    

    // fetch all the packages
   const [packs, setPacks] = useState([]);
   const owner = responseData.id;
   
    useEffect(() => {
      const fetchPackages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/getPackage?owner=${owner}`);
          setPacks(response.data);
        } catch (error) {
          console.error("Error fetching tips:", error);
        }
      };
    
      fetchPackages();
    },);


  return (
    <>
      <Header userdata={responseData} />
      <Sidebar responseData={responseData} />
      <div className="upper">
           <h3 className='tagLine'>Streamline Your Packages: Create, List & Sell with Ease!</h3>
           <Button className="addPack" color="success" onClick={createPackage}>Create Package</Button>
      </div>

      <div className="displayPackages">
       {packs.length > 0 ? (
          packs.map((pack) => <TourCard id={pack.id} responseData={responseData} days={pack.days} startDay={pack.startDay} name={pack.name} place={pack.place} description={pack.description}    price={pack.price} image={pack.image} />)
        ) : (
          <p className="text-center text-gray-500">no packages are listed.</p>
        )}
      </div>
      
    </>
  )
}

export default ManagePackage;
