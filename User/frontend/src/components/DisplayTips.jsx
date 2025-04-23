import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Post from "./Post";
import "../styles/tips.css";
import sharetip from "../Images/shareTrip.png";

const DisplayTips = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseData = location.state?.responseData || navigate("/");
  const cemail = responseData?.user?.email;

  // State to store tips
  const [tips, setTips] = useState([]);

  // Fetch tips when component loads
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getTips");
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTips();
  },);

  return (
    <>
      <Header userdata={responseData} />

      <img src={sharetip} className="sharetrip" alt="Share Trip" />
      <p className="shTagline">Your Travel Tip Could Be Someone's Best Adventure!</p>
      <button className="shareTip" onClick={() => navigate("/createTip", { state: { responseData } })}>
        Share Tips
      </button>

      <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-20 tagsection">
        <h1 className="text-3xl font-bold text-center mb-6">Travel Tips</h1>
        <p className="text-center text-gray-600 mb-10">Make your journey smooth with these travel tips! ✈️🌍</p>
      </div>

      <div className="posts">
        {tips.length > 0 ? (
          tips.map((tip) => <Post id={tip.id} currentUser={cemail} email={tip.email} title={tip.title} description={tip.description} image={tip.image} />)
        ) : (
          <p className="text-center text-gray-500">No travel tips available.</p>
        )}
      </div>
    </>
  );
};

export default DisplayTips;