import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import axios from "axios";
import { CUSTOMER_API_URL } from "../../constants";

const OrderDetails = () => {

  const location = useLocation();
  const { name, branch, from, to, car, card, customerID } = location.state;
  const [customer, setCustomer] = useState(null);

  console.log("customer id: " + customerID)
  console.log(car)

  useEffect(() => {
    console.log(customerID)
    axios.get(CUSTOMER_API_URL + customerID + "/")
    .then((response) => {
       setCustomer(response.data)})
}, []);

  return (
    <div style={{padding:"20px", display:"inline-block"}}>
    <Card sx={{justifyContent:"center", width:"100%", p:4}}>
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
    </Card>
    <div  style={{paddingTop:"20px"}}>
      <Button variant="contained" component={Link} to={"/Rent"}>
        Done
      </Button>
    </div>
    </div>
  );
};

export default OrderDetails;
