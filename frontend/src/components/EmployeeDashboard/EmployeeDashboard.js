import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { RENTALS_API_URL } from "../../constants";

const EmployeeDashboard = () => {
  // useEffect(() => {
  //   axios.get(RENTALS_API_URL).then((response) => {
  //     response.data.map((transaction) => {
  //       if (transaction.licensePlate == "87654321") {
  //         axios.put(RENTALS_API_URL + transaction.rentalID + "/", {
  //           dateFrom: "2022-11-30",
  //           dateTo: "2022-12-01",
  //           dateReturned: "2022-12-1",
  //           totalCost: 10,
  //           licensePlate: "013289120891230",
  //           goldMember: false,
  //           customerID: 123,
  //           branchID: 1,
  //           carID: 1,
  //           typeID: 1,
  //         });
  //       }
  //     });
  //   });
  // }, []);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <Button variant="contained" component={Link} to={"/ReturnCar"}>
        Return Car
      </Button>
    </div>
  );
};
export default EmployeeDashboard;
