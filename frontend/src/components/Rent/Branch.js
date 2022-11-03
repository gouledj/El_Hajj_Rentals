import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@mui/material";

const Branch = () => {

    const rows = [
      { id: 1, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
      { id: 2, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
      { id: 3, col1: "Hello", col2: "World", col3: "World", col4: "World", col5: "World", col6: "World" },
    ];

    const columns = [
      { field: "col1", headerName: "Name", width: 150 },
      { field: "col2", headerName: "Phone Number", width: 150 },
      { field: "col3", headerName: "Street", width: 150 },
      { field: "col4", headerName: "City", width: 150 },
      { field: "col5", headerName: "Province", width: 150 },
      { field: "col6", headerName: "Postal Code", width: 150 },
    ];

    return (
      <div>
        <Typography>Select a branch:</Typography>
        <div style={{ height: 400, width: "70%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
        <div>
        <Button variant="contained" component={Link} to={"/Rent"}>
          Back
        </Button>
        <Button variant="contained" component={Link} to={"/Date"}>
          Next
        </Button>
        </div>
      </div>
    );
}

export default Branch;