import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Date = () => {
  const [from, setFrom] = React.useState(dayjs("2022-04-07"));
  const [to, setTo] = React.useState(dayjs("2022-04-07"));

  return (
    <div>
      <Typography>Renting vehicle:</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
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
      <div>
        <Button variant="contained" component={Link} to={"/Branch"}>
          Back
        </Button>
        <Button variant="contained" component={Link} to={"/AvailableVehicles"}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Date;
