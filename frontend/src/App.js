import NavBar from './components/layouts/NavBar.js'
import './App.css';
import React from "react";
import { Routes, Route } from "react-router";
import Rent from './components/Rent/Rent.js'
import AvailVehicles from './components/Rent/AvailVehicles.js'
import Payments from './components/Rent/Payment.js'
import OrderDetails from './components/Rent/OrderDetails.js'
import Home from './components/Home.js'
import Login from './components/login/Login.js'
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard.js'
import ReturnCar from './components/EmployeeDashboard/ReturnCar.js'
import CarView from './components/EmployeeDashboard/CarView.js'
import AddBranch from './components/EmployeeDashboard/AddBranch.js'
import BranchSelect from './components/EmployeeDashboard/BranchSelect.js'
import BranchInfo from './components/EmployeeDashboard/BranchInfo.js'
import SignUp from "./components/signUp/signUp.js"
import BranchStats from "./components/EmployeeDashboard/BranchStats.js"
import Account from "./components/Account/Account.js"
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CUSTOMER_API_URL } from "./constants";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate, Navigate, BrowserRouter as Router, Redirect } from 'react-router-dom';


function App() {
  const theme = createTheme();

  const [emails, setEmails] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loginStatus, setloginStatus] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {

    axios.get(CUSTOMER_API_URL) //need to create an api where i can grab by typeID and branchID
      .then((response) => {
        setCustomers(response.data)

        // response.data.map((item, id) => {
        //   setEmails(item.email)
        //   setPasswords(item.password)
        // })
      })

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("submitting?")

    // console.log(emails);
    // console.log(passwords);
    // console.log(customers)
    var emailString = data.get('email');
    var passwordString = data.get('password')

    // setLoginEmail(emailString)
    // setLoginPassword(passwordString)

    // console.log(emailString)
    // console.log(passwordString)

    customers.map((customer) => {
      console.log(customer.email)
      console.log(customer.password)

      if (customer.email == emailString && customer.password == passwordString) {
        setloginStatus(true)
        navigate('/Home')
        console.log("SUCCESS")
      }
    })

  };


  const LoginPage = () => {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={LoginPage()} />
        <Route exact path="/Home" element={loginStatus ? <Home /> : LoginPage()} />
        <Route exact path="/Rent" element={loginStatus ? <Rent /> : LoginPage()} />
        <Route exact path="/Payments" element={loginStatus ? <Payments /> : LoginPage()} />
        <Route exact path="/Login" element={loginStatus ? <Login /> : LoginPage()} />
        <Route exact path="/AvailableVehicles" element={loginStatus ? <AvailVehicles /> : LoginPage()} />
        <Route exact path="/OrderDetails" element={loginStatus ? <OrderDetails /> : LoginPage()} />
        <Route exact path="/BranchSelect" element={loginStatus ? <BranchSelect /> : LoginPage()} />
        <Route exact path="/BranchInfo" element={loginStatus ? <BranchInfo /> : LoginPage()} />
        <Route exact path="/BranchStats" element={loginStatus ? <BranchStats /> : LoginPage()} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/Account" element={loginStatus ? <Account /> : LoginPage()} />
        <Route exact path="/EmployeeDashBoard" element={loginStatus ? <EmployeeDashboard /> : LoginPage()} />
        <Route exact path="/ReturnCar" element={loginStatus ? <ReturnCar /> : LoginPage()} />
        <Route exact path="/CarView" element={loginStatus ? <CarView /> : LoginPage()} />
        <Route exact path="/AddBranch" element={loginStatus ? <AddBranch /> : LoginPage()} />
      </Routes>

    </div>
  );
}

export default App;
