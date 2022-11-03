import NavBar from './components/layouts/NavBar.js'
import './App.css';
import React from "react";
import { Routes, Route } from "react-router";
import VehicleType from './components/Rent/VehicleType.js'
import Branch from './components/Rent/Branch.js'
import Date from './components/Rent/Date.js'
import AvailVehicles from './components/Rent/AvailVehicles.js'
import Payments from './components/Rent/Payment.js'
import OrderDetails from './components/Rent/OrderDetails.js'
import Home from './components/Home.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Rent" element={<VehicleType />} />
        <Route exact path="/Branch" element={<Branch />} />
        <Route exact path="/Date" element={<Date />} />
        <Route exact path="/AvailableVehicles" element={<AvailVehicles />} />
        <Route exact path="/Payments" element={<Payments />} />
        <Route exact path="/OrderDetails" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
