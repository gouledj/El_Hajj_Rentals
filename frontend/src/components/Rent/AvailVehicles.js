import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import "../../css/rent.css";
import RentStepper from '../layouts/RentStepper.js'

const AvailVehicles = () => {
  const rows = [
    {
      id: 1,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
      col6: "World",
    },
    {
      id: 2,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
      col6: "World",
    },
    {
      id: 3,
      col1: "Hello",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
      col6: "World",
    },
  ];

  const columns = [
    { field: "col1", headerName: "Image", width: 150 },
    { field: "col2", headerName: "Manufacturer", width: 150 },
    { field: "col3", headerName: "Model", width: 150 },
    { field: "col4", headerName: "FuelType", width: 150 },
    { field: "col5", headerName: "Colour", width: 150 },
    { field: "col6", headerName: "Estimated Cost", width: 150 },
  ];

  return (
    <div>
      <div className="wrapper">
      <div className="steps">
        <RentStepper currentStep={{step:1}} id="steps"/>
      </div>
        <div className="container-avail">
          <Typography>These are our current available vehicles:</Typography>
          <div style={{ height: 400, width: "auto" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>

        <div className="container-buttons">
          <div className="backb">
            <Button variant="contained" component={Link} to={"/Rent"}>
              Back
            </Button>
          </div>
          <div className="nextb">
            <Button variant="contained" component={Link} to={"/Payments"}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailVehicles;
