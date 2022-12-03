import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ReturnDetails from "./ReturnDetails";

import { RENTALS_API_URL, CUSTOMER_API_URL } from "../../constants";

const ReturnCar = () => {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [transaction, setTransaction] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [person, setPerson] = React.useState([]);
  const [checker, setChecker] = React.useState(false);

  // useEffect(() => {
  //   setId(transaction.customerID);
  //   axios.get(CUSTOMER_API_URL).then((response) => {
  //     response.data.map((person) => {
  //       if (person.customerID == id) {
  //         setPerson(person);
  //       }
  //     });
  //   });
  // }, [transaction]);

  const handleChange = (event) => {
    setLicensePlate(event.target.value);
  };

  //12345
  const handleClick = () => {
    axios.get(RENTALS_API_URL).then((response) => {
      response.data.map((transaction) => {
        if (transaction.licensePlate == licensePlate) {
          setTransaction(transaction);
          setId(transaction.customerID);

          axios.get(CUSTOMER_API_URL).then((response) => {
            response.data.map((person) => {
              setPerson(person);
            });
          });
        }
      });
    });

    setChecker(true);
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="License Plate"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        // component={Link}
        // to={{ pathname: "/ReturnDetails" }}
        // state={{
        //   person: person,
        //   transaction: transaction,
        // }}
      >
        Show
      </Button>

      {checker && <ReturnDetails person={person} transaction={transaction} />}
    </div>
  );
};
export default ReturnCar;
