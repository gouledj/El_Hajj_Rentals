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
      </Routes>
    </div>
  );
}

export default App;
