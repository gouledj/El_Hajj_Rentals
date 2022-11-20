import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

import "../../css/rent.css";



const BranchInfo = () => {

    let location = useLocation();
    const [branch, setBranch] = React.useState([]);

    useEffect(() => {
        test();
    }, []);

    const test = () => {
        location.state.branches.forEach((item) => {
            if (item.branchID === location.state.branchID) {
                setBranch(item);
            }
        })

    }

    const carColumns = [
        { field: "col1", headerName: "Image", width: 150 },
        { field: "col2", headerName: "Manufacturer", width: 150 },
        { field: "col3", headerName: "Model", width: 150 },
        { field: "col4", headerName: "FuelType", width: 150 },
        { field: "col5", headerName: "Colour", width: 150 },
        { field: "col6", headerName: "Estimated Cost", width: 150 },
        { field: "col7", headerName: "Available", width: 150 },
    ];

    const carRows = [];

    const transColumns = [
        { field: "col1", headerName: "Customer", width: 150 },
        { field: "col2", headerName: "License Plate", width: 150 },
        { field: "col3", headerName: "Start Date", width: 150 },
        { field: "col4", headerName: "End Date", width: 150 },
        { field: "col5", headerName: "Returned Date", width: 150 },
        { field: "col6", headerName: "Total Cost", width: 150 },
    ];

    const transRows = [];

    return (
        <div>
            <div className="container-avail">
                <h1>Employee Dashboard</h1>
                <h3>Branch Information for {branch.unitNumber}-{branch.streetNumber} {branch.streetName}</h3>
                <h3>{branch.city}, {branch.province}</h3>
            </div>
            <div className="container-avail">
                <div className="backb">
                    <Button variant="contained" component={Link} to={'/BranchSelect'}>
                        Back
                    </Button>
                </div>
            </div>
            <div className="wrapper">
                <div className="container-avail">
                    <Typography>Current cars assigned to branch:</Typography>
                    <div style={{ height: 400, width: "auto" }}>
                        <DataGrid rows={carRows} columns={carColumns} />
                    </div>
                </div>
                <div className="container-avail">
                    <Typography>Recent transactions:</Typography>
                    <div style={{ height: 400, width: "auto" }}>
                        <DataGrid rows={transRows} columns={transColumns} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchInfo;
