import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import axios from 'axios';

import { BRANCH_API_URL } from "../../constants";

import "../../css/rent.css";

const BranchSelect = () => {
    const [branches, setBranches] = React.useState([]);
    const [branch, setBranch] = React.useState([]);

    useEffect(() => {
        axios.get(BRANCH_API_URL).then((response) => {
            setBranches(response.data);
        });
    }, [])

    const handleChange = (event) => {
        getBranch(event.target.value);
    };

    const getBranch = (branchID) => {
        branches.forEach((item) => {
            if (item.branchID === branchID) {
                setBranch(item);
            }
        })

    }

    return (
        <div>
            <div className="container-avail">
                <h1>Employee Dashboard</h1>
            </div>
            <div className="wrapper">
                <section className="container-class">
                    <Typography>Select your branch:</Typography>
                    <Box sx={{ width: "25%" }}>
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
                </section>

                <div className="container-buttons">
                    <div className="nextb">
                        <Button
                            variant="contained"
                            component={Link}
                            to={{ pathname: '/BranchInfo', }}
                            state={{
                                branch: branch
                            }}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BranchSelect;