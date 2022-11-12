import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";


import "../../css/rent.css";

const BranchSelect = () => {
    const [branch, setBranch] = React.useState("");

    const handleChange = (event) => {
        setBranch(event.target.value);
    };

    return (
        <div>
            <div className = "container-avail">
                <h1>Employee Dashboard</h1>
            </div>
            <div className="wrapper">
                <section className="container-class">
                    <Typography>Select your branch:</Typography>
                    <Box sx={{ width: "25%" }}>
                        <FormControl fullWidth>
                            <InputLabel id = "demo-simple-select-label">
                                Branch
                            </InputLabel>
                            <Select 
                                labelID = "demo-simple-select-label"
                                id = "demo-simple-select"
                                value = {branch}
                                label = "Branch"
                                onChange = {handleChange}
                            >
                                <MenuItem value = "1">Branch 1</MenuItem>
                                <MenuItem value = "2">Branch 2</MenuItem>
                                <MenuItem value = "3">Branch 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </section>
                
                <div className = "container-buttons">
                    <div className = "nextb">
                        <Button
                            variant = "contained"
                            component = {Link}
                            to = {'/BranchInfo'}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BranchSelect;