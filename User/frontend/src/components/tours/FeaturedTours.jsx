import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { useLocation, useNavigate } from "react-router-dom";
import image from '../../Images/tourspage.jpg'
import '../../styles/featuretour.css'
import TourCard from '../../components/tours/TourCard';
import axios from 'axios';

const FeaturedTours = () => {
    const location = useLocation();
      const navigate = useNavigate();  
      const responseData = location.state?.responseData || navigate("/");


      const [packs, setPacks] = useState([]);

      useEffect(() => {
          const fetchPacks = async () => {
            try {
              const response = await axios.get(`http://localhost:4000/api/getPackage`);
              setPacks(response.data);
            } catch (error) {
              console.error("Error fetching tips:", error);
            }
          };
        
          fetchPacks();
        },); 
  

  return (
    <>
      <Header userdata={responseData} />
      <img src={image} alt=''  className="tourImage" />
      <div className="glass"></div>   
      <div className="tourTag">Explore Beyond Limits <br /> The Best Tours, All in One Place!</div> 
      
      <div className="featureList">
      {packs.length > 0 ? (
          packs.map((pack) => <TourCard id={pack.id} days={pack.days} startDay={pack.startDay} owner={pack.owner} name={pack.name} responseData={responseData}  place={pack.place} description={pack.description} persom={pack.person} price={pack.price} image={pack.image} />)
        ) : (
          <p className="text-center text-gray-500">sorry for inncovinence.</p>
        )}
      </div>
    </>
  )
}

export default FeaturedTours