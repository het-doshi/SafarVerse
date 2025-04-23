import React from 'react'
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { FaMapMarkerAlt} from "react-icons/fa";
import '../styles/packageCard.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/destination.css"

const Destination = ({image, name, address, id}) => {
   

    const Delete = async (id,name,address) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/deleteDest?id=${id}&name=${name}&address=${address}`); 
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error("Error deleting picture");
        }
    };

  return (
    <>
        <Card className="destCard">
          <div className="position-relative">
            <img className="destImage" src={image} alt=""/>
          </div>
          <CardBody>
           <CardTitle tag="h5" className="fw-bold">{name}</CardTitle>
            <div className="d-flex align-items-center mb-2 text-muted">
              <FaMapMarkerAlt className="me-1 text-primary" />
              <span>{address}</span>
            </div>
            <br />
            <Button color="danger" className="Button"  onClick={() => { Delete(id,name,address) }}>Delete</Button>
          </CardBody>
        </Card>
    </>
  )
}

export default Destination;

