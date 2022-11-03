import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
    return (
        <div>
            details
            <Button variant="contained" component={Link} to={"/Rent"}>
          Return
        </Button>
        </div>
        
    );
}

export default OrderDetails;