import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                defaultValue="Jane Doe"
              />
            </div>
            <div>
              <TextField
                label="Card number"
                id="filled-size-normal"
                defaultValue="1234 1234 1234 1234"
                variant="filled"
              />
            </div>
            <div>
              <TextField
                label="Expiry date"
                id="outlined-size-normal"
                sx={{ m: 1, width: "25ch" }}
                defaultValue="MM / YY"
              />
              <TextField
                label="Security code"
                id="filled-size-normal"
                defaultValue="CVC"
                sx={{ m: 1, width: "25ch" }}
                variant="filled"
              />
            </div>
          </Box>
        </div>

        <div className="container-buttons">
          <div className="backb">
            <Button
              variant="contained"
              component={Link}
              to={"/AvailableVehicles"}
            >
              Back
            </Button>
          </div>
          <div className="nextb">
            <Button variant="contained" onClick={handleClickOpen}>
              Finish
            </Button>
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
                <Button
                  onClick={handleClose}
                  autoFocus
                  component={Link}
                  to={"/OrderDetails"}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
