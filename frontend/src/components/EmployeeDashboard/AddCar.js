import React, { useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import "../../css/rent.css";

import { CARTYPE_API_URL } from "../../constants";
import { CARS_API_URL } from "../../constants";

function AddCar() {
    let location = useLocation();

    const [manufacturer, setManufacturer] = React.useState('');
    const [model, setModel] = React.useState('');
    const [fuelType, setFuelType] = React.useState('');
    const [color, setColor] = React.useState('');
    const [licensePlate, setLicensePlate] = React.useState('');
    const [mileage, setMileage] = React.useState('');
    const [carType, setCarType] = React.useState('');

    const [carTypes, setCarTypes] = React.useState([]);

    useEffect(() => {
        axios.get(CARTYPE_API_URL).then((response) => {
            setCarTypes(response.data);
        });
    }, [])

    const handleClick = () => {
        axios.post(CARS_API_URL, {
            manufacturer: manufacturer,
            model: model,
            fuelType: fuelType,
            color: color,
            licensePlate: licensePlate,
            status: "Available",
            mileage: mileage,
            typeID: carType,
            branchID: location.state.branch.branchID
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <div className='container-avail'>
                <div className="backb">
                    <Button variant="contained" component={Link}
                        to={{ pathname: '/BranchInfo' }}
                        state={{
                            branchID: location.state.branchID,
                            branch: location.state.branch
                        }}>
                        Back
                    </Button>
                </div>
            </div>
            <div className="emp-add-box">
                <Box className="entry-box">
                    <div >
                        <TextField className="emp-add-text-input" required
                            id="manufacturer" label="Manufacturer"
                            variant="outlined" value={manufacturer}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setManufacturer(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="model" label="Model"
                            variant="outlined" value={model}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setModel(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField className="emp-add-text-input" required
                            id="fuel-type" label="Fuel Type"
                            variant="outlined" value={fuelType}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setFuelType(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="color" label="Color"
                            variant="outlined" value={color}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField className="emp-add-text-input" required
                            id="license-plate-number" label="License Plate Number"
                            variant="outlined" value={licensePlate}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setLicensePlate(e.target.value)}
                        />
                        <TextField className="emp-add-text-input" required
                            id="mileage" label="Mileage"
                            variant="outlined" value={mileage}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setMileage(e.target.value)}
                        />
                    </div>
                    <div>
                        <Select className="emp-add-text-input" required
                            id="car-type" label="Car Type"
                            variant="outlined" value={carType}
                            sx={{ m: 1, width: '47%' }}
                            onChange={e => setCarType(e.target.value)}>
                            {carTypes.map((type) => (
                                <MenuItem key={type.typeID} value={type.typeID}>
                                    {type.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                </Box >

            </div >
            <div className='emp-dash-button'>
                <Button
                    sx={{ float: 'right' }}
                    variant="contained"
                    onClick={handleClick}
                    component={Link}
                    to={{ pathname: '/BranchInfo', }}
                    state={{
                        branchID: location.state.branchID,
                        branch: location.state.branch
                    }}
                >
                    Add Car
                </Button>
            </div>
        </div >

    )
}

export default AddCar;