import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const VehicleType = () => {
    const [vehicle, setVehicle] = React.useState('');

    const handleChange = (event) => {
        setVehicle(event.target.value);
      };

    return (
      <div>
        <Typography>Vehicle class:</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vehicle}
              label="Vehicle"
              onChange={handleChange}
            >
              <MenuItem value={'Car'}>Car</MenuItem>
              <MenuItem value={'SUV'}>SUV</MenuItem>
              <MenuItem value={'Van'}>Van</MenuItem>
              <MenuItem value={'Truck'}>Truck</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" component={Link} to={"/Branch"}>
          Next
        </Button>
      </div>
    );
}

export default VehicleType;