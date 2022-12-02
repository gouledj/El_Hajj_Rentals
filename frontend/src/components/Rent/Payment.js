import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import RentStepper from "../layouts/RentStepper.js";
import { Typography } from "@mui/material";
import "../../css/rent.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { RENTALS_API_URL, CARS_API_URL } from "../../constants";

const Payment = () => {
  // note need to get customer ID into this page
  // card name could put down the cuustomer name
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [security, setSecurity] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorCard, setErrorCard] = useState("");
  const [errorExpiry, setErrorExpiry] = useState("");
  const [errorSecurity, setErrorSecurity] = useState("");
  const [carInfo, setCarInfo] = useState(null);

  const location = useLocation();
  const { type, branch, from, to, car } = location.state;

  useEffect(() => {
    axios.get(CARS_API_URL + "" + car.id + "/").then((response) => {
      setCarInfo(response.data);
      console.log(response.data);
    });
  }, []);

  const newRental = () => {
    axios
      .post(RENTALS_API_URL, {
        dateFrom: from,
        dateTo: to,
        dateReturned: to,
        totalCost: car.cost,
        licensePlate: carInfo.licensePlate,
        goldMember: false,
        customerID: 123,
        branchID: branch.id,
        carID: car.id,
        typeID: type,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nameChange = (event) => {
    if (event.target.value.length > 0) {
      setName(event.target.value);
      setErrorName("");
    } else {
      setErrorName("No name has been entered");
    }
  };

  const cardChange = (event) => {
    if (
      event.target.value.replaceAll(" ", "").length === 16 &&
      isNumeric(event.target.value.replaceAll(" ", ""))
    ) {
      setCard(event.target.value);
      setErrorCard("");
    } else {
      setErrorCard("Credit card number is incorrect or empty");
    }
  };

  const expiryChange = (event) => {
    if (
      event.target.value.replaceAll(" ", "").length === 4 &&
      isNumeric(event.target.value.replaceAll(" ", ""))
    ) {
      setExpiry(event.target.value);
      setErrorExpiry("");
    } else {
      setErrorExpiry("Expiry date number is incorrect or empty");
    }
  };

  const securityChange = (event) => {
    if (
      event.target.value.replaceAll(" ", "").length === 3 &&
      isNumeric(event.target.value.replaceAll(" ", ""))
    ) {
      setSecurity(event.target.value);
      setErrorSecurity("");
    } else {
      setErrorSecurity("CVC is incorrect or empty");
    }
  };

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  return (
    <div>
      <div className="wrapper">
        <div className="steps">
          <RentStepper currentStep={{ step: 2 }} id="steps" />
        </div>

        <div className="container-payment">
          <Typography>Payment</Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "75%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Name on card"
                id="outlined-size-normal"
                helperText={errorName}
                error={!!errorName}
                placeholder="Jane Doe"
                onChange={nameChange}
              />
            </div>
            <div>
              <TextField
                label="Card number"
                id="filled-size-normal"
                variant="filled"
                helperText={errorCard}
                error={!!errorCard}
                placeholder="1234 1234 1234 1234"
                onChange={cardChange}
              />
            </div>
            <div>
              <TextField
                label="Expiry date"
                id="outlined-size-normal"
                sx={{ m: 1, width: "20%" }}
                helperText={errorExpiry}
                error={!!errorExpiry}
                placeholder="MMYY"
                onChange={expiryChange}
              />
              <TextField
                label="Security code"
                id="filled-size-normal"
                sx={{ m: 1, width: "25ch" }}
                variant="filled"
                helperText={errorSecurity}
                error={!!errorSecurity}
                placeholder="001"
                onChange={securityChange}
              />
            </div>
          </Box>
        </div>

        <div className="container-buttons">
          <div className="backb">
            <Link
              to={"/AvailableVehicles"}
              state={{ type: type, branch: branch, from: from, to: to }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Back</Button>
            </Link>
          </div>
          <div className="nextb">
            {name && card && expiry && security ? (
              <Button variant="contained" onClick={handleClickOpen}>
                Finish
              </Button>
            ) : (
              <Button variant="contained" disabled={true}>
                Finish
              </Button>
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirming Payment"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you're ready to pay?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Link
                  to={"/OrderDetails"}
                  state={{
                    name: name,
                    type: type,
                    branch: branch,
                    from: from,
                    to: to,
                    car: car,
                    card: card,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" autoFocus onClick={newRental}>
                    Confirm
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
