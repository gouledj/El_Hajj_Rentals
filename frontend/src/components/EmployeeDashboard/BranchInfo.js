import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';

import "../../css/rent.css";

import { CARS_API_URL } from "../../constants";

const BranchInfo = () => {

    let location = useLocation();
    const branch = location.state.branch;

    const [open, setOpen] = React.useState(false);

    const [cars, setCars] = React.useState([]);
    const [selectedCar, setSelectedCar] = React.useState([]);
    const [manufacturer, setManufacturer] = React.useState('');
    const [model, setModel] = React.useState('');

    const handleClickOpen = () => {
        if (selectedCar.length !== 0) {
            setManufacturer(selectedCar.manufacturer);
            setModel(selectedCar.model);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCars();
    }, [branch.branchID])


    const getCars = () => {
        let allCars = [];
        axios.get(CARS_API_URL).then((response) => {
            response.data.forEach((item) => {
                if (item.branchID === branch.branchID) {
                    allCars.push(item);
                }
            })
            setCars(allCars);
        });
    }

    const getSelectedCar = (id) => {
        let car = cars.find((car) => car.carID === id);
        setSelectedCar(car);
    }

    const deleteSelectedCar = () => {
        if (selectedCar.length !== 0) {
            axios.delete(CARS_API_URL + selectedCar.carID)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            cars.splice(cars.indexOf(selectedCar), 1);
        }
        setSelectedCar([]);
        handleClose();
    }


    const carColumns = [
        { field: "image", headerName: "Image", width: 150 },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "fuelType", headerName: "FuelType", width: 150 },
        { field: "colour", headerName: "Colour", width: 150 },
        { field: "available", headerName: "Available", width: 150 },
    ];

    const carRows = [];
    for (let i = 0; i < cars.length; i++) {
        const entry = {
            id: cars[i].carID,
            manufacturer: cars[i].manufacturer,
            model: cars[i].model,
            fuelType: cars[i].fuelType,
            colour: cars[i].color,
            available: cars[i].status
        }
        carRows.push(entry);
    }

    const transColumns = [
        { field: "col1", headerName: "Customer", width: 150 },
        { field: "col2", headerName: "License Plate", width: 150 },
        { field: "col3", headerName: "Start Date", width: 150 },
        { field: "col4", headerName: "End Date", width: 150 },
        { field: "col5", headerName: "Returned Date", width: 150 },
        { field: "col6", headerName: "Total Cost", width: 150 },
    ];

    const transRows = [];

    const handleEvent = (event) => {
        getSelectedCar(event.row.id);

    }

    return (
        <div>
            {console.log(selectedCar.length === 0)}
            <div className="container-avail">
                <h1>Employee Dashboard</h1>
                <h3>Branch Information for {branch.unitNumber}-{branch.streetNumber} {branch.streetName}</h3>
                <h3>{branch.city}, {branch.province}</h3>
            </div>
            <div className="container-buttons">
                <div className="backb">
                    <Button variant="contained" component={Link} to={'/BranchSelect'}>
                        Back
                    </Button>
                </div>
            </div>
            <div className="wrapper">
                <div className="container-buttons">
                    <Typography>Current cars assigned to branch:</Typography>
                    <div style={{ height: 400, width: "auto" }}>
                        <DataGrid
                            rows={carRows}
                            columns={carColumns}
                            onRowClick={handleEvent}
                        />
                    </div>
                    <div className="emp-dash-button">
                        <Button
                            sx={{ float: 'right' }}
                            variant="contained"
                            component={Link}
                            to={{ pathname: '/AddCar' }}
                            state={{
                                branchID: location.state.branchID,
                                branch: location.state.branch
                            }}>
                            Add Car
                        </Button>
                        <Button
                            sx={{ float: 'right', mr: 1 }}
                            variant="contained"
                            onClick={handleClickOpen}
                        >
                            Delete Car
                        </Button>
                    </div>

                </div>
                <div className="container-avail">
                    <Typography>Recent transactions:</Typography>
                    <div style={{ height: 400, width: "auto" }}>
                        <DataGrid rows={transRows} columns={transColumns} />
                    </div>
                </div>
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-delete-car"
                aria-describedby="alert-delete-car-description"
            >
                <DialogTitle id="alert-delete-car">
                    {"Delete this car?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-car-description">
                        Are you sure you want to delete this {manufacturer} {model} from
                        the branch database?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>No</Button>
                    <Button onClick={deleteSelectedCar} variant="contained">
                        Delete Car
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BranchInfo;
