import React from "react";
import '../styles/tourCard.css'
import { Card, CardBody, CardImg, CardSubtitle, CardTitle, Button } from 'reactstrap'
import { FaMapMarkerAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

function TourCard({ name, description, days, startDay, place, image, price,id, responseData}) { 
    
    const navigate = useNavigate();

    const Delete = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`http://localhost:5000/api/deletePackage?id=${id}`); 
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Error deleting picture");
        }
    };

    return (
        <Card className="tourCard" key={id}>
            <CardImg className="tourImage" src={image} alt={name} />
            <CardBody className="CardBody text-center">
             <CardTitle className="text-center" tag="h5">{name}</CardTitle>
             <CardTitle className="text-center" tag="h5">    <FaMapMarkerAlt className="me-1 text-primary text-start" />  {place}</CardTitle>
             <CardSubtitle className="text-center" tag="h5">Price: {price}</CardSubtitle>
             <br />
             <Button color="primary" className="Button destB"  onClick={() => { navigate("/packDetails", { state: { id:id, responseData : responseData, days:days, startDay:startDay, price:price, name:name, description : description } }); }}>Details</Button>
             <Button color="danger" className="Button deltB"  onClick={() => { Delete(id) }}>Delete</Button>
            </CardBody>
        </Card>
    )
}

export default TourCard;