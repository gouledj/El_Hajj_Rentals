import NavBar from "./components/layouts/NavBar.js";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router";

import Rent from "./components/Rent/Rent.js";
import AvailVehicles from "./components/Rent/AvailVehicles.js";
import Payments from "./components/Rent/Payment.js";
import OrderDetails from "./components/Rent/OrderDetails.js";
import Home from "./components/Home.js";
import Login from "./components/login/Login.js";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard.js";
import ReturnCar from "./components/EmployeeDashboard/ReturnCar.js";
import ReturnDetails from "./components/EmployeeDashboard/ReturnDetails.js";
import CarView from "./components/EmployeeDashboard/CarView.js";
import AddBranch from "./components/EmployeeDashboard/AddBranch.js";
import BranchSelect from "./components/EmployeeDashboard/BranchSelect.js";
import BranchInfo from "./components/EmployeeDashboard/BranchInfo.js";
import SignUp from "./components/signUp/signUp.js";
import BranchStats from "./components/EmployeeDashboard/BranchStats.js";
import TransactionView from "./components/EmployeeDashboard/TransactionView.js";
import Account from "./components/Account/Account.js";
import Logout from "./components/Account/Logout.js";
import { useEffect, useState, useMemo } from "react";
import Orders from "./components/Account/Orders.js";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CUSTOMER_API_URL } from "./constants";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  useNavigate,
  Navigate,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Card } from "@mui/material";
import DemoCarousel from "../src/components/layouts/Carousel.js";

function App() {
  const theme = createTheme();

  const [emails, setEmails] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [customers, setCustomers] = useState([]);

  const token = useMemo(() => {
    return localStorage.getItem("Login Status");
  }, []);

  const [loginStatus, setloginStatus] = useState(new Boolean(token));

  const [customerID, setCustomerID] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(CUSTOMER_API_URL) //need to create an api where i can grab by typeID and branchID
      .then((response) => {
        setCustomers(response.data);
      });
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("Login Status");
    if (data !== null) setloginStatus(JSON.parse(data));

    console.log("STATUS", loginStatus);

    // if (loginStatus === true) {
    //   navigate('/Rent')

    // }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Login Status", JSON.stringify(loginStatus));
  }, [loginStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var emailString = data.get("email");
    var passwordString = data.get("password");

    customers.map((customer) => {
      console.log(customer.email);
      console.log(customer.password);

      if (
        customer.email == emailString &&
        customer.password == passwordString
      ) {
        var inputID = customer.customerID;
        console.log(inputID);
        setloginStatus(true);

        navigate("/Rent", { state: { id: inputID } });
        console.log("SUCCESS");
      }
    });
  };

  const LoginPage = () => {
    return (
      <div
        className="login"
        style={{
          display: "flex",
          width: "100%",
          height: "210vh",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card sx={{ width: "30%", pb: 10, pr: 2, pl: 2, mt: 15, minWidth:'400px'}}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ pb: 8, color: "#1C9BDA", fontWeight: 500 }}
                >
                  El-Hajj Rentals
                </Typography>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
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
        </Card>
        <div style={{ paddingTop: "150px", paddingBottom: "150px", width:'95vw'}}>
          <Typography variant='h4' sx={{ textAlign: "center", color: "#FFF", backgroundColor:'rgba(0, 0, 0, 0.4)', pt:5, pb:5 }}>
            It's not the destination, it's the journey.
          </Typography>
        </div>
        <Card sx={{ width: '50%',  mb: 10, minWidth:'550px', pl:4, pr:4}}>
          <DemoCarousel />
        </Card>
      </div>
    );
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={LoginPage()} />
        <Route
          exact
          path="/Rent"
          element={loginStatus ? <Rent /> : LoginPage()}
        />
        <Route
          exact
          path="/Payments"
          element={loginStatus ? <Payments /> : LoginPage()}
        />
        <Route
          exact
          path="/Login"
          element={loginStatus ? <Login /> : LoginPage()}
        />
        <Route
          exact
          path="/AvailableVehicles"
          element={loginStatus ? <AvailVehicles /> : LoginPage()}
        />
        <Route
          exact
          path="/OrderDetails"
          element={loginStatus ? <OrderDetails /> : LoginPage()}
        />
        <Route
          exact
          path="/EmployeeDashBoard"
          element={<EmployeeDashboard />}
        />
        <Route exact path="/ReturnDetails" element={<ReturnDetails />} />
        <Route exact path="/ReturnCar" element={<ReturnCar />} />
        <Route
          exact
          path="/BranchSelect"
          element={loginStatus ? <BranchSelect /> : LoginPage()}
        />
        <Route
          exact
          path="/BranchInfo"
          element={loginStatus ? <BranchInfo /> : LoginPage()}
        />
        <Route
          exact
          path="/BranchStats"
          element={loginStatus ? <BranchStats /> : LoginPage()}
        />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route
          exact
          path="/Account"
          element={loginStatus ? <Account /> : LoginPage()}
        />
        <Route
          exact
          path="/Logout"
          element={loginStatus ? <Logout /> : LoginPage()}
        />
        <Route
          exact
          path="/Orders"
          element={loginStatus ? <Orders /> : LoginPage()}
        />
        <Route
          exact
          path="/EmployeeDashBoard"
          element={loginStatus ? <EmployeeDashboard /> : LoginPage()}
        />
        <Route
          exact
          path="/ReturnCar"
          element={loginStatus ? <ReturnCar /> : LoginPage()}
        />
        <Route
          exact
          path="/CarView"
          element={loginStatus ? <CarView /> : LoginPage()}
        />
        <Route
          exact
          path="/AddBranch"
          element={loginStatus ? <AddBranch /> : LoginPage()}
        />
        <Route
          exact
          path="/TransactionView"
          element={loginStatus ? <TransactionView /> : LoginPage()}
        />
      </Routes>
    </div>
  );
}

export default App;
