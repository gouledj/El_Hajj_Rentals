import React, { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { RENTALS_API_URL } from "../../constants";
import DataServices from "../DataServices";

const ReturnCar = () => {
  const [licensePlate, setLicensePlate] = React.useState("");
  const [transaction, setTransaction] = React.useState([]);

  useEffect(() => {
    // axios.get(RENTALS_API_URL).then((response) => {
    //   response.data.map((transaction) => {
    //     if (transaction.licensePlate == "87654321") {
    //       axios.put(RENTALS_API_URL + transaction.rentalID + "/", {
    //         dateFrom: "2022-11-30",
    //         dateTo: "2022-12-01",
    //         dateReturned: "2022-12-1",
    //         totalCost: 10,
    //         licensePlate: "013289120891230",
    //         goldMember: false,
    //         customerID: 123,
    //         branchID: 1,
    //         carID: 1,
    //         typeID: 1,
    //       });
    //     }
    //   });
    // });
  }, []);
  const handleChange = (event) => {
    setLicensePlate(event.target.value);
  };

  //12345
  const handleClick = () => {
    axios.get(RENTALS_API_URL).then((response) => {
      response.data.map((transaction) => {
        if (transaction.licensePlate == licensePlate) {
          setTransaction(transaction);
        }
      });
    });
  };

  const transColumns = [
    { field: "col1", headerName: "Customer", width: 150 },
    { field: "col2", headerName: "License Plate", width: 150 },
    { field: "col3", headerName: "Start Date", width: 150 },
    { field: "col4", headerName: "End Date", width: 150 },
  ];

  const transRows = [];

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
      <Button variant="contained" onClick={handleClick}>
        Show
      </Button>
      <Button variant="contained">test</Button>
    </div>
  );
};
export default ReturnCar;
