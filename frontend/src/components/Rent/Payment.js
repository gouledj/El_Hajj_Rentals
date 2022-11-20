import React, { useState } from "react";
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

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [security, setSecurity] = useState("");

  const location = useLocation();
  const { type, branch, from, to, car } = location.state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const cardChange = (event) => {
    setCard(event.target.value);
  };

  const expiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const securityChange = (event) => {
    setSecurity(event.target.value);
  };

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
                onChange={nameChange}
              />
            </div>
            <div>
              <TextField
                label="Card number"
                id="filled-size-normal"
                variant="filled"
                onChange={cardChange}
              />
            </div>
            <div>
              <TextField
                label="Expiry date"
                id="outlined-size-normal"
                sx={{ m: 1, width: "25ch" }}
                onChange={expiryChange}
              />
              <TextField
                label="Security code"
                id="filled-size-normal"
                sx={{ m: 1, width: "25ch" }}
                variant="filled"
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
            {name && card && expiry && security
              ? <Button variant="contained" onClick={handleClickOpen}>
              Finish
              </Button>
              :  <Button variant="contained" disabled={true}>
              Finish
              </Button>
            }
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
              state={{ type: type, branch: branch, from: from, to: to, car:car, card:card }}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" autoFocus>Confirm</Button>
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
