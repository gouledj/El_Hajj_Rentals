import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

const OrderDetails = () => {

  const location = useLocation();
  const { branch, from, to, car, card } = location.state;

  console.log(branch)
  console.log(car)
  console.log(card)

  return (
    <div>
      <div>
        Order Details
      </div>
      <div>
        <p>Name: FirstName LastName</p>
        <p>Date of rental: {from + " - " + to}</p>
        <p>Rental Car: {car.manufacturer + " " + car.model}</p>
        <p>Branch: {branch.street + ", " + branch.city + ", " + branch.province + " " + branch.postalCode}</p>
        <p>Credit Card: {card}</p>
        <p>Total Cost: {car.cost}</p>
      </div>
      <Button variant="contained" component={Link} to={"/Rent"}>
        Return
      </Button>
    </div>
  );
};

export default OrderDetails;
