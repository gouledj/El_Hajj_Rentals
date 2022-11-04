import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "../../css/rent.css";
import RentStepper from '../layouts/RentStepper.js'

const Rent = () => {
  const [vehicle, setVehicle] = React.useState("");
  const [from, setFrom] = React.useState(dayjs("2022-04-07"));
  const [to, setTo] = React.useState(dayjs("2022-04-07"));

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
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col2", headerName: "Phone Number", width: 150 },
    { field: "col3", headerName: "Street", width: 150 },
    { field: "col4", headerName: "City", width: 150 },
    { field: "col5", headerName: "Province", width: 150 },
    { field: "col6", headerName: "Postal Code", width: 150 },
  ];

  const handleChange = (event) => {
    setVehicle(event.target.value);
  };

  return (
    <div>
      <div className="steps">
        <RentStepper currentStep={{step:0}} id="steps"/>
      </div>
      <div className="wrapper">
        <section className="container-class">
          <Typography>Vehicle class:</Typography>
          <Box sx={{ width: "25%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a vehicle class
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vehicle}
                label="Vehicle"
                onChange={handleChange}
              >
                <MenuItem value={"Car"}>Car</MenuItem>
                <MenuItem value={"SUV"}>SUV</MenuItem>
                <MenuItem value={"Van"}>Van</MenuItem>
                <MenuItem value={"Truck"}>Truck</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>

        <section className="container-branch">
          <Typography>Select a branch:</Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </section>

        <section className="container-date">
          <Typography>Renting vehicle:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} style={{ width: "25%" }}>
              <DesktopDatePicker
                label="From"
                value={from}
                minDate={dayjs("2017-01-01")}
                onChange={(newValue) => {
                  setFrom(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="TO"
                value={to}
                minDate={from}
                onChange={(newValue) => {
                  setTo(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </section>

        <div className="container-buttons">
          <div className="nextb">
            <Button
              variant="contained"
              component={Link}
              to={"/AvailableVehicles"}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
