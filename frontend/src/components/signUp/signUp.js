import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { Dayjs } from 'dayjs'
import moment from "moment";
import { CUSTOMER_API_URL } from "../../constants";
import axios from "axios";
import { BrowserRouter, useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function SignUp() {
  const [from, setFrom] = useState(Date);

  const [to, setTo] = useState(Date);

  const [birth, setBirth] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = data.get('dateOfBirth')
    console.log(birth)

    const APIENTER = axios.post(CUSTOMER_API_URL, {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      driversLicense: data.get('driverslicense'),
      email: data.get('email'),
      salt: "N/A",
      customerPhone: data.get('phonenumber'),
      dob: birth,
      goldMember: true,
      province: data.get('province'),
      city: data.get('city'),
      postalCode: data.get('postalcode'),
      streetNumber: 0,
      streetName: data.get('streetName'),
      unitNumber: 1,
      password: data.get('password'),

    })

    navigate('/');

  };
  function getDate(date) {
    moment(date).format('MM-DD-YYYY')
    var fdate = new Date(date)
    var finaldate = fdate.getFullYear() + '-' + (fdate.getMonth() + 1) + '-' + fdate.getDate()
    setBirth(finaldate)

    return finaldate
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  type="phonenumber"
                  id="phonenumber"
                  autoComplete="phonenumber"
                />

              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3} >

                    <Box display="flex">
                      <DesktopDatePicker dateAdapter={AdapterDayjs} style={{ width: "50%" }}
                        label="Date of birth"
                        id="dateOfBirth"
                        value={to}
                        type="dateOfBirth"

                        onChange={(newValue) => setTo(getDate(newValue))}



                        inputFormat="MM-DD-YYYY"
                        renderInput={(params) => <TextField {...params} />}

                      />

                      <TextField style={{ width: "50%", marginLeft: '10px' }}
                        required
                        fullWidth
                        name="driverslicense"
                        label="Driver's License"
                        type="driverslicense"
                        id="driverslicense"
                        autoComplete="driverslicense"
                      />
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex">
                  <TextField style={{ width: "50%" }}
                    required
                    fullWidth
                    name="province"
                    label="Province"
                    type="province"
                    id="province"
                    autoComplete="Province"
                  />
                  <TextField style={{ width: "50%", marginLeft: "1rem" }}
                    required
                    fullWidth
                    name="city"
                    label="City"
                    type="city"
                    id="city"
                    autoComplete="city"
                  />
                  <TextField style={{ width: "50%", marginLeft: "1rem" }}
                    required
                    fullWidth
                    name="postalcode"
                    label="Postal Code"
                    type="postalcode"
                    id="postalcode"
                    autoComplete="postalcode"
                  />
                </Box>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="streetName"
                  label="Street Name"
                  type="streetNumber"
                  id="streetName"
                  autoComplete="Street Name"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"

              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}