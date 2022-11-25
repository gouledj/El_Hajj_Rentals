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
import BranchSelect from './components/EmployeeDashboard/BranchSelect.js'
import BranchInfo from './components/EmployeeDashboard/BranchInfo.js'
import SignUp from "./components/signUp/signUp.js"
import Account from "./components/Account/Account.js"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Rent" element={<Rent />} />
        <Route exact path="/AvailableVehicles" element={<AvailVehicles />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/OrderDetails" element={<OrderDetails />} />
        <Route exact path="/BranchSelect" element={<BranchSelect />} />
        <Route exact path="/BranchInfo" element={<BranchInfo />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/Account" element={<Account />} />

      </Routes>
    </div>
  );
}

export default App;
