import React, { useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../layouts/NavBar.js';
import axios from 'axios';

import { CUSTOMER_API_URL, CARS_API_URL, BRANCH_API_URL } from "../../constants";

function TransactionView() {
    let location = useLocation();
    const { transaction, id, branch } = location.state;

    const [customer, setCustomer] = React.useState([]);
    const [car, setCar] = React.useState([]);

    useEffect(() => {
        axios.get(CUSTOMER_API_URL + transaction.customerID + "\\")
            .then(function (response) {
                setCustomer(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(CARS_API_URL + transaction.carID + "\\")
            .then(function (response) {
                setCar(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <div>
            <NavBar state={{ id: id }} />
            <div className="container-avail">
                <h1>Transaction ID: {transaction.rentalID}</h1>
                <h3>Rented From: {branch.unitNumber}-{branch.streetNumber} {branch.streetName}, {branch.city}, {branch.province}</h3>
            </div>



            <div className="emp-add-box">
                <Box>
                    <div >
                        <TextField className="emp-add-text-input"
                            id="customer" label="Customer Name"
                            disabled
                            variant="outlined" value={customer.firstName + " " + customer.lastName}
                            sx={{ m: 1, width: '47%' }}
                        />
                        <TextField className="emp-add-text-input"
                            id="car" label="Car"
                            disabled
                            variant="outlined" value={car.manufacturer + " " + car.model}
                            sx={{ m: 1, width: '47%' }}
                        />
                    </div>
                    <div >
                        <TextField className="emp-add-text-input"
                            id="dateFrom" label="Rental Start Date"
                            disabled
                            variant="outlined" value={transaction.dateFrom}
                            sx={{ m: 1, width: '47%' }}
                        />
                        <TextField className="emp-add-text-input"
                            id="dateTo" label="Rental End Date"
                            disabled
                            variant="outlined" value={transaction.dateTo}
                            sx={{ m: 1, width: '47%' }}
                        />
                    </div>
                </Box >

            </div >
            <div className='container-avail'>
                <div className="backb">
                    <Button variant="contained" component={Link}
                        to={{ pathname: '/BranchInfo' }}
                        state={{
                            branch: branch,
                            id: id,
                        }}>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TransactionView;