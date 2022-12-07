import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../layouts/NavBar.js'
import { useLocation } from 'react-router-dom'
import { Card } from "@mui/material";

import { CUSTOMER_API_URL } from "../../constants";

const About = () => {
    const [customers, setCustomers] = useState([]);
    const [firstName, setFirstName] = useState('First Name');
    const [lastName, setLastName] = useState('Last Name');
    const [email, setEmail] = useState('email@email.com');
    const [phoneNumber, setPhoneNumber] = useState('5871112222');
    const [driversLicense, setDriversLicense] = useState('drivers licence');
    const [province, setProvince] = useState('province');
    const [city, setCity] = useState('city');
    const [postalCode, setPostalCode] = useState('postal code');
    const [streetNumber, setStreetNumber] = useState('street number');
    const [streetName, setStreetName] = useState('street name');
    const [unitNumber, setUnitNumber] = useState('unit number');
    const [load, setLoad] = useState(false);

    const location = useLocation();
    const { id } = location.state;
    console.log("CURRENT ID: ", location.state)

    useEffect(() => {
        axios.get(CUSTOMER_API_URL)
        .then((response) => {
           setCustomers(response.data);
           setLoad(true);
          response.data.map((item, id) => {
              setFirstName(item.firstName)
              setLastName(item.lastName)
              setEmail(item.email)
              setPhoneNumber(item.customerPhone)
              setDriversLicense(item.driversLicense)
              setProvince(item.province)
              setCity(item.city)
              setPostalCode(item.postalCode)
              setStreetNumber(item.streetNumber)
              setStreetName(item.streetName)
              setUnitNumber(item.unitNumber)
             })
           
        })
        .catch()

    }, []);

    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
    };

    const handleDriversLicenseChange = (event) => {
      setDriversLicense(event.target.value);
    };

    const handleProvinceChange = (event) => {
      setProvince(event.target.value);
    };
    
    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

    const handlePostalCodeChange = (event) => {
      setPostalCode(event.target.value);
    };
    
    const handleStreetNumberChange = (event) => {
      setStreetNumber(event.target.value);
    };

    const handleStreetNameChange = (event) => {
      setStreetName(event.target.value);
    };

    const handleUnitNumberChange = (event) => {
      setUnitNumber(event.target.value);
    };

    const delete2 = () => {
        axios.delete(CUSTOMER_API_URL + id + '/');
        console.log("delete successful");
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        firstName: data.get('firstName'),
        lastName: data.get('firstName'),
        email: data.get('email'),
        phoneNumber: data.get('phoneNumber'),
        driversLicense: data.get('driversLicense'),
        province: data.get('province'),
        city: data.get('city'),
        postalCode: data.get('postalCode'),
        streetNumber: data.get('streetNumber')
      })
      const res = axios.put(CUSTOMER_API_URL + id + '/', {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        driversLicense: data.get('driversLicense'),
        email: data.get('email'),
        salt: customers[0].salt,
        customerPhone: data.get('phoneNumber'),
        dob: customers[0].dob,
        goldMember: customers[0].goldMember,
        province: data.get('province'),
        city: data.get('city'),
        postalCode: data.get('postalCode'),
        streetNumber: data.get('streetNumber'),
        streetName: data.get('streetName'),
        unitNumber: data.get('unitNumber')
      })
    };

    const theme = createTheme();


    return (
      <>
        <NavBar state={{ id: id }}/>
        <div
      className='background'
      style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          flexDirection: "column",
        }}>
      <Card sx={{width:"30%", p: 5, mt: 5}}>
          <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            User details
          </Typography>
          { customers?.length > 0
            ? (
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="off"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
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
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="phonenumber"
                  id="phoneNumber"
                  autoComplete="phonenumber"
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                        required
                        value={driversLicense}
                        onChange={handleDriversLicenseChange}
                        fullWidth
                        name="driversLicense"
                        label="Driver's License"
                        type="driverslicense"
                        id="driversLicense"
                        autoComplete="driverslicense"
                      />

              </Grid>

              <Grid item xs={12}>
                <Box display="flex">
                  <TextField style={{ width: "50%" }}
                    required
                    value={province}
                    onChange={handleProvinceChange}
                    fullWidth
                    name="province"
                    label="Province"
                    type="province"
                    id="province"
                    autoComplete="Province"
                  />
                  <TextField style={{ width: "50%", marginLeft: "1rem" }}
                    required
                    value={city}
                    onChange={handleCityChange}
                    fullWidth
                    name="city"
                    label="City"
                    type="province"
                    id="city"
                    autoComplete="Province"
                  />
                  <TextField style={{ width: "50%", marginLeft: "1rem" }}
                    required
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    fullWidth
                    name="postalCode"
                    label="Postal Code"
                    type="province"
                    id="postalCode"
                    autoComplete="Province"
                  />
                </Box>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  value={streetNumber}
                  onChange={handleStreetNumberChange}
                  fullWidth
                  name="streetNumber"
                  label="Street Number"
                  type="streetNumber"
                  id="streetNumber"
                  autoComplete="streetNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={streetName}
                  onChange={handleStreetNameChange}
                  fullWidth
                  name="streetName"
                  label="Street Name"
                  type="streetName"
                  id="streetNumber"
                  autoComplete="streetNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  value={unitNumber}
                  onChange={handleUnitNumberChange}
                  fullWidth
                  name="unitNumber"
                  label="Unit Number"
                  type="streetNumber"
                  id="unitNumber"
                  autoComplete="streetNumber"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save changes
            </Button>
          </Box>
            ) : (
                <div>else test</div>
            )}
          
        </Box>
      </Container>
    </ThemeProvider>
          </Card>
        </div>
      </>
    );
}

export default About;