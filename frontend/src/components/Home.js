import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="text">Create Account</Button>
                <Button variant="contained" component={Link} to={'/Rent'}>
                    Login
                </Button>
                <Button variant="outlined">Employee</Button>
            </Stack>
        </div>
    );
}

export default Home;