import React, { useEffect, useState } from "react";
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
import axios from "axios";
import moment from "moment";
import { Dayjs } from 'dayjs'
import { useLocation, location } from 'react-router-dom'


import { BRANCH_API_URL, CARTYPE_API_URL } from "../../constants";

const Rent = () => {
  const [vehicle, setVehicle] = useState('');
  const [branchSelect, setBranchSelect] = useState(null);
  const [from, setFrom] = useState(Date);
  const [to, setTo] = useState(Date);
  const [branches, setBranches] = useState([]);
  const [carType, setCarType] = useState([]);

  const location = useLocation();

  const { state } = location

  console.log("RENTT", state.id)

  useEffect(() => {
    axios.get(BRANCH_API_URL)
      .then((response) => {
        setBranches(response.data);
      })
      .catch(console.log("error or loading"))

    axios.get(CARTYPE_API_URL)
      .then((response) => {
        setCarType(response.data);
      })
      .catch(console.log("error or loading"))
  }, []);

  const newRows = [];
  for (let i = 0; i < branches.length; i++) {
    const entry = {
      id: i + 1,
      branchName: branches[i].branchID,
      branchPhone: branches[i].branchPhone,
      city: branches[i].city,
      street: branches[i].streetName,
      province: branches[i].province,
      postalCode: branches[i].postalCode
    }
    newRows.push(entry);
  }

  const columns = [
    { field: "branchName", headerName: "Branch Number", width: 150 },
    { field: "branchPhone", headerName: "Phone Number", width: 150 },
    { field: "city", headerName: "Street", width: 150 },
    { field: "street", headerName: "City", width: 150 },
    { field: "province", headerName: "Province", width: 150 },
    { field: "postalCode", headerName: "Postal Code", width: 150 },
  ];

  const handleChange = (event) => {
    setVehicle(event.target.value);
  };

  const cellClick = (event) => {
    setBranchSelect(event.row);
  }

  function getDate(date) {
    moment(date).format('MM-DD-YYYY')
    var fdate = new Date(date)
    var finaldate = fdate.getMonth() + 1 + '-' + (fdate.getDate()) + '-' + fdate.getFullYear()
    console.log(finaldate);
    return finaldate
  }

  return (
    <div>
      <div className="steps">
        <RentStepper currentStep={{ step: 0 }} id="steps" />
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
              >{
                  carType.map(item =>
                    <MenuItem key={item.key} value={item}>
                      {item.description}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Box>
        </section>

        <section className="container-branch">
          <Typography>Select a branch:</Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={newRows} columns={columns} onCellClick={cellClick} />
          </div>
        </section>

        <section className="container-date">
          <Typography>Renting vehicle:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} style={{ width: "25%" }}>
              <DesktopDatePicker
                label="From"
                value={from}
                minDate={Date()}
                onChange={(newValue) => setFrom(getDate(newValue))}
                inputFormat="MM-DD-YYYY"
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="To"
                value={to}
                minDate={from}
                onChange={(newValue) => setTo(getDate(newValue))}
                inputFormat="MM-DD-YYYY"
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </section>

        <div className="container-buttons">
          <div className="nextb">
            {vehicle && branchSelect && from && to
              ? <Link to={"/AvailableVehicles"}
                state={{ type: vehicle.typeID, branch: branchSelect, from: getDate(from), to: getDate(to) }}
                style={{ 'textDecoration': 'none' }}>
                <Button variant="contained" >
                  Next
                </Button>
              </Link>
              : <Button variant="contained" disabled={true}>
                Next
              </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
