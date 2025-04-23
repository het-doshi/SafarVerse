import React from "react";
import { Card, CardBody, CardTitle, CardText, Button, Badge } from "reactstrap";
import {FaMapMarkerAlt} from "react-icons/fa";
import '../../styles/tour.css'
import { useNavigate } from "react-router-dom";

const TourCard = ({name, place, price, image, days,owner, startDay, id, description, responseData}) => {

   const navigate = useNavigate();

  return (
    <Card className="tourCard">

      <div className="position-relative">
        <img src={image} alt="" className="img-fluid rounded-top" />
        <Badge color="warning" className="position-absolute top-0 end-0 m-2 text-white"> Featured </Badge>
      </div>

      <CardBody>
        <div className="d-flex align-items-center mb-2 text-muted">
          <FaMapMarkerAlt className="me-1 text-primary" /> <span>{place}</span> 
        </div>

        <CardTitle tag="h5" className="fw-bold">{name}</CardTitle>

        <CardText className="text-primary fw-bold"> ₹{price} <span className="text-muted fs-6">/per person</span> </CardText>

        <Button color="primary"  className="w-100"  
         onClick={() => { navigate("/tourDetails", { state: { id:id, responseData : responseData, days:days, owner:owner, startDay:startDay,  name:name, description : description, price:price, image:image, place:place } }); }}> 
         View Details 
        </Button>
        
      </CardBody>
    </Card>
  );
};

export default TourCard;
