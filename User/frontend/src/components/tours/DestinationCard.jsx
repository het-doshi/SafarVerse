import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FaMapMarkerAlt} from "react-icons/fa";
import '../../styles/destCard.css'


const DestinationCard = ({image, address, name}) => {
  return (
    <Card className="packageCard">
      <div className="position-relative">
        <img className="packImage" src={image} alt=""/>
      </div>
      <CardBody>
        <div className="d-flex align-items-center mb-2 text-muted">
          <FaMapMarkerAlt className="me-1 text-primary" />
          <span>{address}</span>
        </div>
        <CardTitle tag="h5" className="fw-bold">{name}</CardTitle>
      </CardBody>
    </Card>
  );
};

export default DestinationCard;
