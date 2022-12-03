import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

import { BRANCH_API_URL, CARTYPE_API_URL, CARS_API_URL } from "../../constants";

const ReturnDetails = (props) => {
  const [from, setFrom] = useState(Date);
  const [to, setTo] = useState(Date);
  const [ret, setReturnDate] = useState(Date);
  const [branches, setBranches] = React.useState([]);
  const [branch, setBranch] = React.useState([]);
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState(null);
  const [carSelect, setCarSelect] = useState(null);
  const [cost, setCost] = useState(0);
  const [changeFee, setChangeFee] = useState(0);
  const [open, setOpen] = React.useState(false);

  function getDate(date) {
    moment(date).format("MM-DD-YYYY");
    var fdate = new Date(date);
    var finaldate =
      fdate.getMonth() + 1 + "-" + fdate.getDate() + "-" + fdate.getFullYear();
    return finaldate;
  }

  const handleReturnDate = (returnDate) => {
    setReturnDate(returnDate);
    console.log(from);
    console.log(to);
    //setCost(calculateCost(calculateDays(from, to), carType));
  };

  function calculateDays(from, to) {
    const difference = Math.abs(
      new Date(to.replace("-", "/")) - new Date(from.replace("-", "/"))
    );
    const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return totalDays;
  }

  function calculateCost(days, carType) {
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
    // setTo(props.transaction.dateFrom);
    // setFrom(props.transaction.dateTo);
    axios.get(BRANCH_API_URL).then((response) => {
      setBranches(response.data);
    });

    axios
      .get(CARS_API_URL) //need to create an api where i can grab by typeID and branchID
      .then((response) => {
        setCars(response.data);
      })
      .catch(console.log("error or loading"));

    axios
      .get(CARTYPE_API_URL)
      .then((response) => {
        setCarType(response.data);
      })
      .catch(console.log("error or loading"));
  }, []);

  //   const handleChange = (event) => {
  //     if (event.target.value != props.transaction.branchID) {
  //       carType.map((type) => {
  //         if (type.typeID == props.transaction.typeID) {
  //           setChangeFee(type.changeBranchFee);
  //         }
  //       });
  //     }
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <h1>Booking Details</h1>
      <TextField
        id="first-name"
        label="First Name"
        variant="outlined"
        value={props.person.firstName}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="last-name"
        label="Last Name"
        variant="outlined"
        value={props.person.lastName}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="date-from"
        label="Date From"
        variant="outlined"
        value={props.transaction.dateFrom}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="date-to"
        label="Date To"
        variant="outlined"
        value={props.transaction.dateTo}
        InputProps={{
          readOnly: true,
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Return Date"
          value={ret}
          minDate={from}
          onChange={(newValue) => handleReturnDate(getDate(newValue))}
          inputFormat="MM-DD-YYYY"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        {/* <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={branch.branchID}
          label="id"
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          {branches.map((branch) => {
            return (
              <MenuItem key={branch.branchID} value={branch.branchID}>
                {branch.unitNumber}-{branch.streetNumber} {branch.streetName},{" "}
                {branch.city} {branch.province}
              </MenuItem>
            );
          })}
        </Select> */}
      </div>

      {/* <Select
        labelId="branch-select-label"
        id="branch-select"
        value={branch.branchID}
        label="Branch"
        onChange={handleChange}
      >
        {branches.map((branch) => (
          <MenuItem key={branch.branchID} value={branch.branchID}>
            {branch.unitNumber}-{branch.streetNumber} {branch.streetName},{" "}
            {branch.city} {branch.province}
          </MenuItem>
        ))}
      </Select> */}
      <h1>{cost}</h1>
      <h1>{changeFee}</h1>
    </div>
  );
};
export default ReturnDetails;
