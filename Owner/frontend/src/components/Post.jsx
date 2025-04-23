import React from "react";
import "../styles/post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from 'react-toastify';

function Post({ title, description, image, email, currentUser, id}) {
 
   

  const Delete = async (id) => {
    try {
        console.log(id)
        const response = await axios.delete(`http://localhost:5000/api/deleteTip?id=${id}`); 
        toast.success(response.data.message);
    } catch (error) {
        console.error("Error deleting:", error);
        toast.error("Error deleting picture");
    }
};


  return (
    <div className="d-flex justify-content-center mt-5">
      <ToastContainer />
      <Card style={{ width: "800px", marginTop: "1px" }}>
        <CardImg className="postImg" alt="Travel Tip" src={image} style={{ width: "90%", marginLeft: "28px",  marginTop: "20px", height: "260px", borderRadius: "5px 5px 0 0" }} />
        <CardBody>
          <CardTitle tag="h3">{title}</CardTitle>
          <CardText>{description}</CardText>
          <div className="d-flex justify-content-end">
          {currentUser === email && (
              <Button color="danger" className="Button"  onClick={() => { Delete(id) }}>Delete</Button>
          )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Post;
