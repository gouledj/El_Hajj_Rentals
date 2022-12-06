import React, { useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import { TRANSACTION_API_URL, CUSTOMER_API_URL, CARS_API_URL } from "../../constants";

function TransactionView() {
    let location = useLocation();
    const transaction = location.state.transaction;

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
            <h1>Transaction #{transaction.rentalID}</h1>
            <div className='container-avail'>
                <div className="backb">
                    <Button variant="contained" component={Link}
                        to={{ pathname: '/BranchInfo' }}
                        state={{
                            branch: location.state.branch
                        }}>
                        Back
                    </Button>
                </div>
            </div>

            <div className="emp-add-box">
                <Box className="entry-box">
                    <div >
                        <TextField className="emp-add-text-input"
                            id="customer" label="Customer Name"
                            disabled
                            variant="outlined" value={customer.firstName + " " + customer.lastName}
                            sx={{ m: 1, width: '47%' }}
                        // onChange={e => setManufacturer(e.target.value)}
                        />
                        <TextField className="emp-add-text-input"
                            id="car" label="Car"
                            disabled
                            variant="outlined" value={car.manufacturer + " " + car.model}
                            sx={{ m: 1, width: '47%' }}
                        // onChange={e => setModel(e.target.value)}
                        />
                    </div>
                    <div >
                        <TextField className="emp-add-text-input"
                            id="dateFrom" label="Rental Start Date"
                            disabled
                            variant="outlined" value={transaction.dateFrom}
                            sx={{ m: 1, width: '47%' }}
                        // onChange={e => setManufacturer(e.target.value)}
                        />
                        <TextField className="emp-add-text-input"
                            id="dateTo" label="Rental End Date"
                            disabled
                            variant="outlined" value={transaction.dateTo}
                            sx={{ m: 1, width: '47%' }}
                        // onChange={e => setModel(e.target.value)}
                        />
                    </div>


                </Box >

            </div >
        </div>
    )
}

export default TransactionView;