import { Button, Grid, Rating } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom' 

function RatingModal({ orderId, vendorName, customerComments }) {

    const [displayRating, setDisplayRating] = useState(false);
    const [value, setValue] = useState(null);
    const navigate = useNavigate();

    function handleClick(){

        axios
            .post("http://localhost:8080/order/setcompleted/", { rating : value, orderId : orderId} )
            .then((res) => {if(res.status === 200) navigate("/dashboard/customer")})
            .catch((err) => console.log(err));

        setDisplayRating(false);
        navigate("/dashboard/customer")
    }

  return (
    <>
      <Button
        onClick={(e) => {
            setDisplayRating(true);
        }}
        variant="contained"

      >
        Complete Order
      </Button>
      <Modal dialogClassName="modal-90w" onHide={()=> setDisplayRating(false)} show={displayRating}>
        <Modal.Header closeButton>
            <Modal.Title>
                <h5>Review</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <Grid container sx={{ marginBottom : 5}}>
                    <Grid item xs={12} sm={4}>
                        <h6>Vendor Name :</h6>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {vendorName}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <h6>Order Description :</h6>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {customerComments}
                    </Grid>
                </Grid>
                <div className="row mb-3">
                    <div className="col-12 text-center"><h5>Give Feedback</h5></div>
                    <div className="col-12 d-flex"> <Rating name="simple-controlled" value={value} onChange={(e, newValue)=> setValue(newValue)} sx={{ margin : "0 auto"}} /> </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center"> <Button onClick={handleClick} disabled={!value}>Complete Order</Button></div>
                </div>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RatingModal;
