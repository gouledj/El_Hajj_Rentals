import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import NavBar from '../layouts/NavBar.js';

import { BRANCH_API_URL } from '../../constants';

const AddBranch = () => {

    let location = useLocation();
    const { branch, id } = location.state;
    console.log("customer id: " + id)

    const [streetNumber, setStreetNumber] = React.useState('');
    const [streetName, setStreetName] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [unitNumber, setUnitNumber] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const handleClick = () => {
        axios.post(BRANCH_API_URL, {
            streetNumber: streetNumber,
            streetName: streetName,
            city: city,
            province: province,
            postalCode: postalCode,
            unitNumber: unitNumber,
            branchPhone: phoneNumber

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
        <NavBar state={{ id: id }}/>
        <div>
            <div className='container-buttons'>
                <div className="emp-dash-button">
                    <Button variant="contained"
                        sx={{ float: 'left' }}
                        component={Link}
                        to={'/BranchSelect'}
                        state={{id:id}}>
                        Back
                    </Button>
                </div>
            </div>
            <div className="emp-add-box">
                <Box className="entry-box">
                    <div >
                        <TextField className="emp-add-text-input"
                            id="unitNumber" label="Unit #"
                            variant="outlined" value={unitNumber}
                            sx={{ m: 1, width: '15%' }}
                            onChange={e => setUnitNumber(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="streetNumber" label="Street #"
                            variant="outlined" value={streetNumber}
                            sx={{ m: 1, width: '30%' }}
                            onChange={e => setStreetNumber(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="streetName" label="Street Name"
                            variant="outlined" value={streetName}
                            sx={{ m: 1, width: '48.3%' }}
                            onChange={e => setStreetName(e.target.value)}
                        />
                    </div>
                    <div >
                        <TextField className="emp-add-text-input" required
                            id="city" label="City"
                            variant="outlined" value={city}
                            sx={{ m: 1, width: '58.3%' }}
                            onChange={e => setCity(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="province" label="Province"
                            variant="outlined" value={province}
                            sx={{ m: 1, width: '15%' }}
                            onChange={e => setProvince(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="postalCode" label="Postal Code"
                            variant="outlined" value={postalCode}
                            sx={{ m: 1, width: '20%' }}
                            onChange={e => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField className="emp-add-text-input" required
                            id="phoneNumber" label="Phone Number"
                            variant="outlined" value={phoneNumber}
                            sx={{ m: 1, width: '35%' }}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </Box >

            </div >
            <div className="container-buttons">
                <div className="emp-dash-button">
                    <Button
                        sx={{ float: 'right' }}
                        variant="contained"
                        onClick={handleClick}
                        component={Link}
                        to={{ pathname: '/BranchSelect', }}
                        state={{id:id}}
                    >
                        Add Branch
                    </Button>
                </div>
            </div>
        </div >
        </>
        
    )
}

export default AddBranch;