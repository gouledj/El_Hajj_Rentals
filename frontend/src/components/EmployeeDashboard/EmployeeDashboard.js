import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

//http://127.0.0.1:8000/api/rentals/?licensePlate=013289120891230
const EmployeeDashboard = () => {
  return (
    <div>
      <div className="container-avail">
        <h1>Employee Dashboard</h1>
      </div>

      <Button variant="contained" component={Link} to={"/ReturnCar"}>
        Return Car
      </Button>
    </div>
  );
};
export default EmployeeDashboard;
