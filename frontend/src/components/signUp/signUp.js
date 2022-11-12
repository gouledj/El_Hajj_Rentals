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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";


const theme = createTheme();

export default function SignUp() {

  const [from, setFrom] = React.useState(dayjs("2022-04-07"));
  const [to, setTo] = React.useState(dayjs("2022-04-07"));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      phoneNumber: data.get('phoneNumber'),
      dateOfBirth: data.get('dateOfBirth')



    });
  };

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

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
                      <DesktopDatePicker style={{ width: "50%" }}
                        label="Date of birth"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={from}
                        type="dateOfBirth"
                        minDate={dayjs("2017-01-01")}
                        onChange={(newValue) => {
                          setFrom(newValue);
                        }}
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
                    name="province"
                    label="City"
                    type="province"
                    id="province"
                    autoComplete="Province"
                  />
                  <TextField style={{ width: "50%", marginLeft: "1rem" }}
                    required
                    fullWidth
                    name="province"
                    label="Postal Code"
                    type="province"
                    id="province"
                    autoComplete="Province"
                  />
                </Box>

              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="streetNumber"
                  label="Street Number"
                  type="streetNumber"
                  id="streetNumber"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
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