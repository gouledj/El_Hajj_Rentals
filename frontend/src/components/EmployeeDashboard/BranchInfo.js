import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Button, Typography, Box, FormControl, InputLabel,
    Select, MenuItem
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from "@mui/x-data-grid";
import { VehicleImages } from "../Rent/VehicleImages.js"
import CarTypes from "../../constants/CarTypes";
import axios from 'axios';
import NavBar from '../layouts/NavBar.js';

import "../../css/rent.css";

import { CARS_API_URL, BRANCH_API_URL, RENTALS_API_URL, CUSTOMER_API_URL } from "../../constants";

const BranchInfo = () => {

    let location = useLocation();
    const { branch, id } = location.state;
    console.log("customer id: " + id)

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [transferOpen, setTransferOpen] = React.useState(false);

    const [cars, setCars] = React.useState([]);
    const [selectedCar, setSelectedCar] = React.useState([]);
    const [manufacturer, setManufacturer] = React.useState('');
    const [model, setModel] = React.useState('');
    const [branches, setBranches] = React.useState([]);
    const [selectedBranch, setSelectedBranch] = React.useState('');
    const [transactions, setTransactions] = React.useState([]);
    const [customers, setCustomers] = React.useState([]);

    const getCustomers = () => {
        axios.get(CUSTOMER_API_URL)
            .then(function (response) {
                setCustomers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getTransactions = () => {
        let allTransactions = [];
        axios.get(RENTALS_API_URL).then((response) => {
            response.data.forEach((item) => {
                if (item.branchID === branch.branchID) {
                    allTransactions.push(item);
                }
            })
            setTransactions(allTransactions);
        });
    }

    const getBranches = () => {
        axios.get(BRANCH_API_URL)
            .then(function (response) {
                setBranches(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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


    const handleDeleteClickOpen = () => {
        setManufacturer(selectedCar.manufacturer);
        setModel(selectedCar.model);
        setDeleteOpen(true);
    };

    const handleTransferClickOpen = () => {
        setManufacturer(selectedCar.manufacturer);
        setModel(selectedCar.model);
        setTransferOpen(true);
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleTransferClose = () => {
        setTransferOpen(false);
    };

    const getSelectedBranch = (branchID) => {
        branches.forEach((item) => {
            if (item.branchID === branchID) {
                setSelectedBranch(item);
            }
        })
    }

    const handleChange = (event) => {
        getSelectedBranch(event.target.value);
    };

    useEffect(() => {
        getCars();
        getBranches();
        getCustomers();
        getTransactions();
    }, [branch.branchID])





    const getSelectedCar = (id) => {
        let car = cars.find((car) => car.carID === id);
        setSelectedCar(car);
        console.log(car);
    }

    const deleteSelectedCar = () => {
        axios.delete(CARS_API_URL + selectedCar.carID)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        cars.splice(cars.indexOf(selectedCar), 1);

        setSelectedCar([]);
        handleDeleteClose();
    }

    const transferSelectedCar = () => {
        axios.put(CARS_API_URL + selectedCar.carID + "\\", {
            manufacturer: selectedCar.manufacturer,
            model: selectedCar.model,
            fuelType: selectedCar.fuelType,
            color: selectedCar.color,
            licensePlate: selectedCar.licensePlate,
            status: selectedCar.status,
            mileage: selectedCar.mileage,
            typeID: selectedCar.typeID,
            branchID: selectedBranch.branchID,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        cars.splice(cars.indexOf(selectedCar), 1);

        setSelectedCar([]);
        handleTransferClose();
    }


    const carColumns = [
        {
            field: "image",
            headerName: "Image",
            width: 300,
            renderCell: (params) =>
                <img src={params.value}
                    style={{ "width": "200px", "marginLeft": "30px" }} />
        },
        { field: "manufacturer", headerName: "Manufacturer", width: 150 },
        { field: "model", headerName: "Model", width: 150 },
        { field: "carType", headerName: "Car Type", width: 150 },
        { field: "fuelType", headerName: "Fuel Type", width: 150 },
        { field: "colour", headerName: "Colour", width: 150 },
        { field: "available", headerName: "Available", width: 150 },
    ];

    const carRows = [];

    for (let i = 0; i < cars.length; i++) {
        const entry = {
            image: VehicleImages(cars[i].typeID),
            id: cars[i].carID,
            manufacturer: cars[i].manufacturer,
            model: cars[i].model,
            carType: CarTypes.carTypes[cars[i].typeID - 1].description,
            fuelType: cars[i].fuelType,
            colour: cars[i].color,
            available: cars[i].status
        }
        carRows.push(entry);
    }


    const transColumns = [
        { field: "customer", headerName: "Customer", width: 150 },
        { field: "licensePlate", headerName: "License Plate", width: 150 },
        { field: "startDate", headerName: "Start Date", width: 150 },
        { field: "endDate", headerName: "End Date", width: 150 },
        { field: "returnedDate", headerName: "Returned Date", width: 150 },
        { field: "totalCost", headerName: "Total Cost", width: 150 },
    ];

    const transRows = [];

    for (let i = 0; i < transactions.length; i++) {
        let temp;
        for (let j = 0; j < customers.length; j++) {
            if (customers[j].customerID === transactions[i].customerID) {
                temp = customers[j].firstName + " " + customers[j].lastName;
            }
        }
        const entry = {
            id: transactions[i].rentalID,
            customer: temp,
            licensePlate: transactions[i].licensePlate,
            startDate: transactions[i].dateFrom,
            endDate: transactions[i].dateTo,
            returnedDate: transactions[i].dateReturned,
            totalCost: transactions[i].totalCost
        }
        transRows.push(entry);
    }

    const handleEvent = (event) => {
        getSelectedCar(event.row.id);
    }

    const canTransfer = () => {
        if (selectedCar.status === "Available") {
            return true;
        }
        return false;
    }


    return (
        <>
            <NavBar state={{ id: id }}/>
            <div>
            <div className="container-avail">
                <h1>Employee Dashboard</h1>
                <h3>Branch Information for {branch.unitNumber}-{branch.streetNumber} {branch.streetName}</h3>
                <h3>{branch.city}, {branch.province}</h3>
            </div>
            <div className="container-buttons">
                <div className="backb">
                    <Button variant="contained" component={Link} to={'/BranchSelect'} state={{id:id}}>
                        Back
                    </Button>
                </div>
                <div className="nextb">
                    <Button
                        variant="contained"
                        disabled={branch.branchID === undefined}
                        component={Link}
                        to={{ pathname: '/BranchStats', }}
                        state={{
                            branch: branch,
                            id: id,
                        }}>
                        Branch Statistics
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
                            getRowHeight={() => 'auto'}
                            onRowClick={handleEvent}
                        />
                    </div>
                    <div className="emp-dash-button">
                        <Button
                            sx={{ float: 'right' }}
                            id="add"
                            variant="contained"
                            component={Link}
                            to={{ pathname: '/CarView' }}
                            state={{
                                branch: location.state.branch,
                                id: id,
                            }}>
                            Add Car
                        </Button>
                        <Button
                            sx={{ float: 'right', mr: 1 }}
                            disabled={selectedCar.length === 0}
                            id="edit"
                            variant="contained"
                            component={Link}
                            to={{ pathname: '/CarView' }}
                            state={{
                                branch: location.state.branch,
                                car: selectedCar,
                                id: id,
                            }}>
                            Edit Car Details
                        </Button>
                        <Button
                            sx={{ float: 'right', mr: 1 }}
                            disabled={selectedCar.length === 0 || !canTransfer()}
                            id="delete"
                            variant="contained"
                            onClick={handleDeleteClickOpen}
                        >
                            Delete Car
                        </Button>
                        <Button
                            sx={{ float: 'right', mr: 1 }}
                            disabled={selectedCar.length === 0 || !canTransfer()}
                            id="transfer"
                            variant="contained"
                            onClick={handleTransferClickOpen}
                        >
                            Transfer Car
                        </Button>
                    </div>

                </div>
                <div className="container-avail">
                    <Typography sx={{ mt: 4 }}>Recent transactions:</Typography>
                    <div style={{ height: 400, width: "auto" }}>
                        <DataGrid rows={transRows} columns={transColumns} />
                    </div>
                </div>
            </div>



            {/* Delete Car Dialog */}
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
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
                    <Button onClick={handleDeleteClose} autoFocus>No</Button>
                    <Button onClick={deleteSelectedCar} variant="contained">
                        Delete Car
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Transfer Car Dialog */}
            <Dialog
                open={transferOpen}
                onClose={handleTransferClose}
                aria-labelledby="alert-transfer-car"
                aria-describedby="alert-transfer-car-description"
            >
                <DialogTitle id="alert-delete-car">
                    {"Transfer this car?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-car-description">
                        Which branch do you want to transfer this {manufacturer} {model} to?
                    </DialogContentText>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="branch-select-label">
                                Branch
                            </InputLabel>
                            <Select
                                labelId="branch-select-label"
                                id="branch-select"
                                value={branch.branchID}
                                label="Branch"
                                onChange={handleChange}
                            >
                                {branches.map((branch) => (
                                    <MenuItem key={branch.branchID} value={branch.branchID}>
                                        {branch.unitNumber}-{branch.streetNumber} {branch.streetName}, {branch.city} {branch.province}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferClose} autoFocus>No</Button>
                    <Button disabled={selectedBranch.length === 0}
                        onClick={transferSelectedCar} variant="contained">
                        Transfer Car
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </>
        
    )
}

export default BranchInfo;
