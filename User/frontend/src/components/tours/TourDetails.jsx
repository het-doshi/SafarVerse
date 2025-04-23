import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/tourDetail.css"
import axios from 'axios';
import DestinationCard from './DestinationCard';
import { FaMapMarkerAlt} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Card, CardBody, CardTitle, CardText, Input, Button, Row, Col, FormGroup} from "reactstrap";

const TourDetails = () => {
  
    const location = useLocation();
    const navigate = useNavigate();  
    const [dests, setDests] = useState([]);

    const responseData = location.state?.responseData || navigate("/");
    const image = location.state?.image;
    const name = location.state?.name;
    const description = location.state?.description;
    const id = location.state?.id;
    const price = location.state?.price;
    const place = location.state?.place;
    const days = location.state?.days;
    const startDay = location.state?.startDay;
    const owner = location.state?.owner;
    const user = responseData?.user?.username
    const email = responseData?.user?.email 
      
    useEffect(() => {
      const fetchPackages = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/getDestinations?id=${id}`);
          setDests(response.data);
        } catch (error) {
          console.error("Error fetching tips:", error);
        }
      };
    
      fetchPackages();
    },);
   

    const serviceCharge = 200;
    const [subtotal, setSubtotal] = useState(0);
    const [person, setPerson] = useState(0); 
    const [total, setTotal] = useState(0);
    
    const handleChange = (e) => {
      let persons = Number(e.target.value);
      
      
      if (persons < 1) persons = 1;
    
      setPerson(persons);
    
      const newSubtotal = persons * price; 
      setSubtotal(newSubtotal);
    
      setTotal(newSubtotal + serviceCharge); 
    };

  return (
    <>
      <Header userdata={responseData} />
      <img src={image} alt="" className="tourimage" />
      <h4 className='tourName'>Tour Summary for {name}</h4>
      <div className="tourDescription">{description}</div>
      
      <div className="packdetails">
        <h4 className="Dplace"> <FaMapMarkerAlt className="me-1 text-primary" /> <span>{place}</span> </h4>
        <h4 className="tourPrice"> Just for Rs {price} / person </h4>
        <h4 className="Dplace">Tour starts at <SlCalender/> {startDay} </h4>
        <h4 className="Dplace">No of Days: {days} </h4>
      </div>
         

      <div className="destTag">Our tour cover all these amazing destinations! </div>

      

      <div className="tourDestinations"> 
      {dests.length > 0 ? (
          dests.map((dest) => <DestinationCard  name={dest.name} image={dest.image} address={dest.address}  />)
        ) : (
          <p className="text-center text-gray-500">no destinations.</p>
        )}
      </div>
      
       <div className="bookingsection">
       <Card className="p-3 shadow">
      <CardBody>
        <CardTitle tag="h5"> Booking section </CardTitle>
        <hr />

        <CardText>  
          
          <h6>Information</h6>
          <h6>Name: {user}</h6>
          <h6>Email: {email}</h6>
          <hr />


          <FormGroup> 
          <Input id="persons" min={0} name="persons" placeholder="no of members" type="number" value={person} onChange={handleChange}/>
          </FormGroup>
          <hr />

          <Row>
             <Col xs="8"> ₹{price} × {person} person </Col>
             <Col xs="4" className="text-end"> ₹{subtotal}</Col>
          </Row>

          <Row>
            <Col xs="8">Service charge</Col>
            <Col xs="4" className="text-end">₹{serviceCharge}</Col>
          </Row>
           
          <hr />

          <Row>
            <Col xs="8"> <strong>Total</strong> </Col>
            <Col xs="4" className="text-end"> <strong>₹{total}</strong> </Col>
          </Row>

        </CardText>
        <Button color="primary" className="w-100">Book Now</Button>
      </CardBody>
    </Card>
       </div>


    </>
  )
}

export default TourDetails
