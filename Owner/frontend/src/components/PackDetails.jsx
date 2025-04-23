import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Label, Input, FormGroup } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Destination from "./Destination";
import "../styles/destination.css"

const PackDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responseData = location.state?.responseData;
  const name = location.state?.name;
  const id = location.state?.id;
  const price = location.state?.price;
  const days = location.state?.days;
  const startDay = location.state?.startDay;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    image: null,
  });

  useEffect(() => {
    if (!responseData) {
      navigate("/");
    }
  }, [responseData, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.name || !formData.address || !formData.image) {
      toast.error("All fields are required!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post( `http://localhost:5000/api/addDest?packageId=${id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
      setFormData({ name: "", address: "", image: null });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add destination.");
    }
  };


      
      const [dests, setDestinations] = useState([]);

      
      useEffect(() => {
          const fetchDests = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/getDestinations?id=${id}`);
              setDestinations(response.data);
            } catch (error) {
              console.error("Error fetching tips:", error);
            }
          };
        
          fetchDests();
        },); 
        

  return (
    <>
      <Header userdata={responseData} />
      <ToastContainer/>
      <Sidebar responseData={responseData} />

      <Form   onSubmit={handleSubmit} style={{ width: "550px", marginTop: "80px", marginLeft: "270px", position: "fixed",}}>
        <h4>Add Destinations for {name}!</h4>

        <FormGroup> <Label for="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter Destination Name" type="text" value={formData.name} onChange={handleChange} required/>
        </FormGroup>

        <FormGroup> <Label for="address">Address</Label>
          <Input id="address" name="address" placeholder="Enter Address" type="textarea" value={formData.address} onChange={handleChange} required/>
        </FormGroup>

        <FormGroup>
          <Label for="image">Destination Image</Label>
          <Input id="image" name="image" type="file" onChange={handleChange} required />
        </FormGroup>

        <button className="btn btn-success" type="submit"> Submit</button>

      </Form>

      <div className="ph">
        <h4>All Listed Destinations</h4>
        <hr />
      </div>

      <div className="displayDestinations">
        {dests.length > 0 ? (
          dests.map((dest) => <Destination id={id}  name={dest.name} image={dest.image} address={dest.address}  />)
        ) : (
          <p className="text-center text-gray-500">no destinations.</p>
        )}
      </div>

      <div className="packDetails">
       <h4>Package Details </h4>
       <h5>Package Price: ₹ {price}</h5>
       <h5>Package begining date: {startDay} </h5>
       <h5>No of Days: {days} </h5>
      </div>
    </>
  );
};

export default PackDetails;
