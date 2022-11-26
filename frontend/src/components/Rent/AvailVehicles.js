import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import "../../css/rent.css";
import RentStepper from '../layouts/RentStepper.js'
import axios from "axios";
import moment from "moment";

import { CARS_API_URL, CARTYPE_API_URL, RENTALS_API_URL } from "../../constants";

function calculateDays(from, to){
  
  const difference = Math.abs(new Date(to.replace('-','/')) - new Date(from.replace('-','/')));
  const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return totalDays;
};

function calculateCost(days, carType){
  let remaining = days;
  let cost = 0;
  while( remaining > 0){
    if(remaining >= 30){
      cost += carType.monthlyCost;
      remaining -= 30;
    }
    else if (remaining >= 7){
      cost += carType.weeklyCost;
      remaining -= 7;
    }
    else if (remaining >= 1) {
      cost += carType.dailyCost;
      remaining -= 1;
    }
  }
  return cost;
}

const AvailVehicles = () => {
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState(null);
  const [carSelect, setCarSelect] = useState(null);
  const [rentals, setRentals] = useState([]);

  const location = useLocation()
  const { type, branch, from, to } = location.state;

  useEffect(() => {

    axios.get(CARS_API_URL) //need to create an api where i can grab by typeID and branchID
      .then((response) => {
        setCars(response.data);
      })
      .catch(console.log("error or loading"))

      axios.get(CARTYPE_API_URL)
      .then((response) => {
        for (let i=0; i <response.data.length; i++){
          if (response.data[i].typeID === type){
            setCarType(response.data[i]);
          }
        }
      })
      .catch(console.log("error or loading"))

    axios.get(RENTALS_API_URL)
    .then((response) => {
      setRentals(response.data);
    })
    .catch(console.log("error or loading"))

  }, []);

  const cellClick = (event) => {
    setCarSelect(event.row);
  }

  function flipDate(string){
    //Function used to convert Django dates (YYYY-MM-DD) to MM-DD-YYYY
    const [month, day, year] = string.split('-');
    const flipped = [year, month, day].join('-');

    return flipped
  }

  function flipDate2(string) {
    const [year, month, day] = string.split('-');
    const flipped = [month, day, year].join('-');
    return flipped;
  }

  const available = []
  for(let item of cars){
    //From all the cars, filter out only the ones that match the carType and branchID
    if(item.typeID === type && item.branchID === branch.id){
      //Check existing rentals for conflicts
      var notAvailable = false;
      for(let i=0; i < rentals.length; i++){
        //If a rental exists with the same car
        if(item.carID === rentals[i].carID){
          //Compare the days you want to rent with the current rental to check for conflicts
          if(((flipDate(from) <= rentals[i].dateTo) && (flipDate(to) >= rentals[i].dateFrom))){
            //Car is already rented out during this period, not available
            console.log("Not available");
            notAvailable = true;
          }
        }
      }
      //If we have looped through all rentals and determined its not available, break out and dont add. Otherwise,
      //the car is available and has no active rentals involving it, in this case show as available.
      if(notAvailable === false && !available.includes(item)){
        available.push(item);
      }
    }
  }
  
  const rows = [];
  if (carType){
    for(let i = 0; i < available.length; i++){
      const entry = {
        id: i+1,
        image: "insert picture here",
        manufacturer: available[i].manufacturer,
        model: available[i].model,
        fueltype: available[i].fuelType,
        colour: available[i].color,
        cost: calculateCost(calculateDays(from, to), carType)
      }
      rows.push(entry);
    }
  }

  const columns = [
    { field: "image", headerName: "Image", width: 150 },
    { field: "manufacturer", headerName: "Manufacturer", width: 150 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "fueltype", headerName: "FuelType", width: 150 },
    { field: "colour", headerName: "Colour", width: 150 },
    { field: "cost", headerName: "Estimated Cost", width: 150 },
  ];

  return (
    <div>
      <div className="wrapper">
      <div className="steps">
        <RentStepper currentStep={{step:1}} id="steps"/>
      </div>
        <div className="container-avail">
          <Typography>These are our current available vehicles:</Typography>
          <div style={{ height: 400, width: "auto" }}>
          <DataGrid rows={rows} columns={columns} onCellClick={cellClick}/>
          </div>
        </div>

        <div className="container-buttons">
          <div className="backb">
            <Button variant="contained" component={Link} to={"/Rent"}>
              Back
            </Button>
          </div>
          <div className="nextb">
          {carSelect 
            ? <Link to={"/Payments"}
                    state={{ type:type,
                              branch:branch,
                              from: flipDate(from) ,
                              to:flipDate(to),
                              car:carSelect}}
                    style={{'textDecoration':'none'}}>
                <Button variant="contained" >
                  Next
                </Button>
            </Link>
            : <Button variant="contained" disabled={true}>
              Next
              </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailVehicles;
