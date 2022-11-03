import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@mui/material";

const AvailVehicles = () => {

    const rows = [
        { id: 1, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
        { id: 2, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
        { id: 3, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
      ];
  
      const columns = [
        { field: "col1", headerName: "Image", width: 150 },
        { field: "col2", headerName: "Manufacturer", width: 150 },
        { field: "col3", headerName: "Model", width: 150 },
        { field: "col4", headerName: "FuelType", width: 150 },
        { field: "col5", headerName: "Colour", width: 150 },
        { field: "col6", headerName: "Estimated Cost", width: 150 },
      ];
  
      return (
        <div>
          <Typography>These are our current available vehicles:</Typography>
          <div style={{ height: 400, width: "auto" }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
          <div>
          <Button variant="contained" component={Link} to={"/Date"}>
            Back
          </Button>
          <Button variant="contained" component={Link} to={"/Payments"}>
            Next
          </Button>
          </div>
        </div>
      );
}

export default AvailVehicles;