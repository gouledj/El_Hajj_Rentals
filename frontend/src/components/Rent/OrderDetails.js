import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import axios from "axios";
import { CUSTOMER_API_URL } from "../../constants";
import NavBar from '../layouts/NavBar.js'

const OrderDetails = () => {

  const location = useLocation();
  const { name, branch, from, to, car, card, id} = location.state;
  const [customer, setCustomer] = useState(null);

  console.log("customer id: " + id)
  console.log(car)

  useEffect(() => {
    console.log(id)
    axios.get(CUSTOMER_API_URL + id + "/")
    .then((response) => {
       setCustomer(response.data)})
}, []);

  return (
    <>
    <NavBar state={{ id: id }}/>
    <div
      className='background'
      style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          flexDirection: "column",
        }}>
    <Card sx={{width:"50%", p: 5, mt: 5}}>
      <Typography variant="h4">
        Order Details
      </Typography>
      {customer && <div style={{paddingTop:"10px"}}>
        <Typography sx={{mt:2}}>Name: {customer.firstName + " " + customer.lastName}</Typography>
        <Typography sx={{mt:1}}>Date of rental: {from + " to " + to}</Typography>
        <Typography sx={{mt:1}}>Rental Car: {car.manufacturer + " " + car.model}</Typography>
        <Typography sx={{mt:1}}>Branch: {branch.street + ", " + branch.city + ", " + branch.province + " " + branch.postalCode}</Typography>
        <Typography sx={{mt:4}}>Total Estimated Cost: ${car.cost}</Typography>
        <Typography sx={{mt:1}}>Credit card receipt will be emailed to the customer.</Typography>
      </div>}
      <div  style={{paddingTop:"70px"}}>
    <Link to={"/Rent"}
                    state={{ id:id }}
                    style={{'textDecoration':'none'}}>
                <Button variant="contained" >
                  Done
                </Button>
            </Link>
    </div>
    </Card>
    
    </div>
    </>
  );
};

export default OrderDetails;
