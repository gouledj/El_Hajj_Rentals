import React, { useEffect, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import NavBar from "../layouts/NavBar.js";

import {
  BRANCH_API_URL,
  CARTYPE_API_URL,
  CARS_API_URL,
  RENTALS_API_URL,
} from "../../constants";

const ReturnDetails = () => {
  let location = useLocation();
  const [ret, setReturnDate] = useState(Date);
  const [branches, setBranches] = React.useState([]);
  const [branch, setBranch] = React.useState([]);
  const [car, setCar] = useState([]);
  const [carType, setCarType] = useState([]);
  const [rentCost, setRentalCost] = useState(0);
  const [changeBranchFee, setBranchChangeFee] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [newBranch, setNewBranch] = React.useState([]);

  const { id } = location.state;
  console.log("customer id: " + id);

  const handleReturnDate = (returnDate) => {
    // need to figure out which transaction
    setReturnDate(returnDate);

    // calculate rental cost
    setRentalCost(
      calculateCost(
        calculateDays(
          getDate(location.state.transaction.dateFrom),
          getDate(returnDate)
        ),
        carType
      )
    );

    //late fee
    if (
      moment(location.state.transaction.dateTo).format("MM-DD-YYYY") !==
      moment(getDate(returnDate)).format("MM-DD-YYYY")
    ) {
      setLateFee(carType.lateFee);
    } else {
      setLateFee(0);
    }
  };

  function getDate(date) {
    moment(date).format("MM-DD-YYYY");
    var fdate = new Date(date);
    var finaldate =
      fdate.getMonth() + 1 + "-" + fdate.getDate() + "-" + fdate.getFullYear();
    return finaldate;
  }
  function calculateDays(from, to) {
    const convertTo = new Date(to.replace("-", "/"));
    const convertFrom = new Date(from.replace("-", "/"));
    const difference = Math.abs(convertTo - convertFrom);
    const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return totalDays;
  }
  function calculateCost(days, carType) {
    console.log(carType);
    let remaining = days;
    let cost = 0;
    while (remaining > 0) {
      if (remaining >= 30) {
        cost += carType.monthlyCost;
        remaining -= 30;
      } else if (remaining >= 7) {
        cost += carType.weeklyCost;
        remaining -= 7;
      } else if (remaining >= 1) {
        cost += carType.dailyCost;
        remaining -= 1;
      }
    }
    return cost;
  }

  useEffect(() => {
    axios.get(BRANCH_API_URL).then((response) => {
      setBranches(response.data);
    });
    axios
      .get(CARS_API_URL) //need to create an api where i can grab by typeID and branchID
      .then((response) => {
        console.log(response.data);
        response.data.map((car) => {
          console.log(car.licensePlate + " " + location.state.transaction.licensePlate)
          if (car.licensePlate === location.state.transaction.licensePlate) {
            setMileage(car.mileage);
            setCar(car);
            console.log("test");
          }
        }
        )
      })
      .catch(console.log("error or loading"));
    axios
      .get(CARTYPE_API_URL)
      .then((response) => {
        response.data.map((type) => {
          if (type.typeID === location.state.transaction.typeID) {
            setCarType(type);
          }
        });
      })
      .catch(console.log("error or loading"));

    console.log(car);
  }, []);

  const handleChange = (event) => {
    if (event.target.value != location.state.transaction.branchID) {
      setBranchChangeFee(carType.changeBranchFee);
      setNewBranch(event.target.value);
    } else {
      setBranchChangeFee(0);
      setNewBranch(event.target.value);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const finalize = () => {
    axios
      .put(RENTALS_API_URL + location.state.transaction.rentalID + "/", {
        dateFrom: location.state.transaction.dateFrom,
        dateTo: location.state.transaction.dateTo,
        dateReturned: flipDate(moment(ret).format("MM-DD-YYYY")),
        totalCost: rentCost + lateFee + changeBranchFee,
        licensePlate: location.state.transaction.licensePlate,
        goldMember: location.state.transaction.goldMember,
        customerID: location.state.transaction.customerID,
        branchID: location.state.transaction.branchID,
        carID: location.state.transaction.carID,
        typeID: location.state.transaction.typeID,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(car.carID);
    axios
      .put(CARS_API_URL + car.carID + "/", {
        carID: car.carID,
        manufacturer: car.manufacturer,
        model: car.model,
        fuelType: car.fuelType,
        color: car.color,
        licensePlate: car.licensePlate,
        status: car.status,
        mileage: mileage,
        typeID: car.typeID,
        branchID: newBranch,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function flipDate(string) {
    //Function used to convert Django dates (YYYY-MM-DD) to MM-DD-YYYY
    const [month, day, year] = string.split("-");
    const flipped = [year, month, day].join("-");

    return flipped;
  }

  const handleMileage = (event) => {
    setMileage(event.target.value);
  };

  return (
    <>
      <NavBar state={{ id: id }} />
      <div style={{ padding: "20px" }}>
        <div style={{ padding: "10px" }}>
          <h1>Transaction Details</h1>
        </div>
        <div style={{ paddingBottom: "10px", display: "flex" }}>
          <div style={{ padding: "10px" }}>
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              value={location.state.person.firstName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div style={{ padding: "10px", paddingLeft: "0" }}>
            <TextField
              id="last-name"
              label="Last Name"
              el="Last Name"
              variant="outlined"
              value={location.state.person.lastName}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "10px", paddingTop: "0" }}>
            <TextField
              id="date-from"
              label="Date From"
              variant="outlined"
              value={location.state.transaction.dateFrom}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div style={{ padding: "10px", paddingTop: "0", paddingLeft: "0" }}>
            <TextField
              id="date-to"
              label="Date To"
              variant="outlined"
              value={location.state.transaction.dateTo}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "10px", paddingTop: "0" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Return Date"
                minDate={new Date()}
                onChange={(newValue) => handleReturnDate(getDate(newValue))}
                inputFormat="MM-DD-YYYY"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ padding: "10px", paddingTop: "0", paddingLeft: "0" }}>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="branch-select-label">Branch</InputLabel>
              <Select
                labelId="branch-select-label"
                id="branch-select"
                value={branch.branchID}
                label="Branch"
                onChange={handleChange}
              >
                {location.state.branches &&
                  location.state.branches.map((branch) => (
                    <MenuItem key={branch.branchID} value={branch.branchID}>
                      {branch.unitNumber}-{branch.streetNumber}{" "}
                      {branch.streetName}, {branch.city} {branch.province}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <TextField
            id="mileage"
            label="Mileage"
            variant="outlined"
            value={mileage}
            onChange={handleMileage}
          />
        </div>
        <div style={{ padding: "10px" }}>
          <section>
            <Typography>Rental Cost: ${rentCost && rentCost}</Typography>
            <Typography>Change Branch fee: ${changeBranchFee}</Typography>
            <Typography>Late fees: ${lateFee}</Typography>
            <Typography>
              Total Cost: ${rentCost && rentCost + lateFee + changeBranchFee}
            </Typography>
          </section>
        </div>
        <div style={{ padding: "10px", paddingTop: "20px" }}>
          <Button
            className="backb"
            sx={{ float: "left" }}
            variant="contained"
            component={Link}
            to={{ pathname: "/BranchSelect" }}
            state={{ id: id }}
          >
            Back
          </Button>
          <Button
            className="nextb"
            variant="contained"
            disabled={rentCost + lateFee + changeBranchFee === 0}
            onClick={finalize}
            component={Link}
            to={{ pathname: "/BranchSelect" }}
            state={{ id: id }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
};
export default ReturnDetails;
