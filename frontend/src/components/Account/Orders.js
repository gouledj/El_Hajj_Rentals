import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../../css/rent.css";
import axios from "axios";
import { useLocation } from 'react-router-dom'
import NavBar from '../layouts/NavBar.js'
import { Card } from "@mui/material";

import { RENTALS_API_URL, CARTYPE_API_URL, CARS_API_URL, BRANCH_API_URL } from "../../constants";

const Orders = () => {
  const [rentals, setRentals] = useState([])
  const [cars, setCars] = useState([])
  const [carTypes, setCarTypes] = useState([])
  const [branches, setBranches] = useState([])
  const [rentalSelect, setRentalSelect] = useState(null);

  const location = useLocation();
  const { id } = location.state;
  console.log("CURRENT ID: ", location.state)

  //console.log("Past Orders", state.id) //not getting id rn 

  useEffect(() => {
    axios.get(RENTALS_API_URL)
      .then((response) => {
        setRentals(response.data);
      })
      .catch(console.log("error or loading"))

    axios.get(CARS_API_URL)
      .then((response) => {
        setCars(response.data);
      })
      .catch(console.log("error or loading"))

    axios.get(CARTYPE_API_URL)
      .then((response) => {
        setCarTypes(response.data);
      })
      .catch(console.log("error or loading"))

    axios.get(BRANCH_API_URL)
      .then((response) => {
        setBranches(response.data);
      })
      .catch(console.log("error or loading"))

  }, []);

  const getCar = (carID) => {
    for(let car of cars){
        if(car.carID === carID){
            const name = car.manufacturer + " " + car.model;
            return name;
        }
    }
  }

  const getCarType = (typeID) => {
    for(let carType of carTypes){
        if(carType.typeID === typeID){
            const name = carType.description;
            return name;
        }
    }
  }

  const getBranch = (branchID) => {
    for(let branch of branches){
        if(branch.typeID === branchID){
            const address = branch.streetNumber + " " + branch.streetName + ", " + branch.city + ", " + branch.province;
            return address;
        }
    }
  }

  const newRows = [];
  if(rentals && cars && carTypes && branches){
    for (let i = 0; i < rentals.length; i++) {
        if(rentals[i].customerID === id){ //will change when we can pass the id
            const entry = {
                id: i + 1,
                rentalID: rentals[i].rentalID,
                from: rentals[i].dateFrom,
                to: rentals[i].dateTo,
                returned: rentals[i].dateReturned,
                vehicle: getCar(rentals[i].carID), //need name
                licensePlate: rentals[i].licensePlate,
                carType: getCarType(rentals[i].typeID), //need description
                branch: rentals[i].branchID, //need address
                cost: rentals[i].totalCost
            }
            newRows.push(entry);
        }
      }
  }
  
  const columns = [
    { field: "rentalID", headerName: "Rental ID", width: 100 },
    { field: "from", headerName: "From", width: 150 },
    { field: "to", headerName: "To", width: 150 },
    { field: "returned", headerName: "Returned", width: 150 },
    { field: "vehicle", headerName: "Vehicle", width: 200 },
    { field: "licensePlate", headerName: "License Plate", width: 150 },
    { field: "carType", headerName: "Car Type", width: 150 },
    { field: "branch", headerName: "Branch ID", width: 150 },
    { field: "cost", headerName: "Cost ($)", width: 150 },
  ];

  const cellClick = (event) => {
    setRentalSelect(event.row);
  }


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
      <Card sx={{width:"85%", p: 5, mt: 5}}>
        <div className="wrapper">
        <section className="container-branch">
            <Typography variant="h3" sx={{pb:5}}>Account Orders</Typography>
          <Typography>Past Transactions:</Typography>
          <div style={{ height: 400, width: "100%" }}>
            {rentals && cars && carTypes && branches &&
                <DataGrid rows={newRows} columns={columns} onCellClick={cellClick} />}
          </div>
        </section>
      </div>
        </Card>
    </div>
    </>
  );
};

export default Orders;
