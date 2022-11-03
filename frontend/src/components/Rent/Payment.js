import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Payment = () => {
    return (
        <div>
            <div>
                How will you pay?
            </div>
            <div>
          <Button variant="contained" component={Link} to={"/AvailableVehicles"}>
            Back
          </Button>
          <Button variant="contained" component={Link} to={"/OrderDetails"}>
            Next
          </Button>
          </div>
        </div>
    );
}

export default Payment;