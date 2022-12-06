import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { RENTALS_API_URL, CARTYPE_API_URL } from "../../constants";
import Plot from "react-plotly.js";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { FormText } from "react-bootstrap";
import NavBar from '../layouts/NavBar.js';

const BranchStats = () => {
  const location = useLocation();
  const { branch, id } = location.state;
  console.log("customer id: " + id)

  const [names, setNames] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [rentals, setRentals] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const rentals = [];
    const typeList = [];
    axios.get(RENTALS_API_URL).then((response) => {
      response.data.map((item) => {
        if (item.branchID === branch.branchID) rentals.push(item);
        if (!typeList.includes(item.typeID)) typeList.push(item.typeID);
      });
      setRentals(rentals);
      setTypeList(typeList);
    });
  }, []);

  useEffect(() => {
    axios.get(CARTYPE_API_URL).then((response) => {
      setIsLoad(false);
      setNames(response.data);
    });
    if (!isLoad) {
      const x_axis = [];
      const y_axis = [];
      const data = [];
      for (let type of typeList) {
        let count = 0;
        for (let rental of rentals) {
          if (rental.typeID === type) {
            count += 1;
          }
        }
        if (count > 0) {
          x_axis.push(carName(type));
          y_axis.push(count);
        }
      }

      //1) combine the arrays:
      var list = [];
      for (var j = 0; j < x_axis.length; j++)
        list.push({ name: x_axis[j], count: y_axis[j] });

      //2) sort:
      list.sort(function (a, b) {
        return a.count < b.count ? -1 : a.count == b.count ? 0 : 1;
      });

      setTemp(list);
    }
  }, [rentals, typeList]);

  const carName = (typeID) => {
    for (let i = 0; i < names.length; i++) {
      if (names[i].typeID === typeID) {
        return names[i].description;
      }
    }
  };

  return (
    <>
      <NavBar state={{ id: id }}/>
      <div>
      <div className="backb">
        <Button
          variant="contained"
          component={Link}
          to={"/BranchInfo"}
          state={{
            branch: branch,
            id:id,
          }}
          style={{ margin: "20px" }}
        >
          Back
        </Button>
      </div>
      <Box sx={{ display: "flex", mt: "50px" }}>
        {temp.length > 0 ? (
          <Plot
            //use Plotly to create line graphs
            data={[
              {
                x: temp.map((item) => item.name),
                y: temp.map((item) => item.count),
                type: "bar",
              },
            ]}
            layout={{
              width: 600,
              height: 500,
              xaxis: {
                type: "category",
                title: "Car Type",
              },
              yaxis: {
                title: "Number of Orders",
              },
              categoryorder: "category ascending",
              title: "Number of Orders according to Car Type",
            }}
            style={{ marginLeft: "100px", padding: "40px" }}
          />
        ) : (
          <h2 style={{ marginLeft: "300px", padding: "40px" }}>
            No cars ordered on this branch
          </h2>
        )}
        {temp && temp.length > 1 && <div style={{paddingTop:"100px"}}>
          <Card style={{ padding: "20px", width: "100%" }}>
            <p>Most ordered car type</p>
            <h1 style={{ textAlign: "center" }}>{temp[temp.length - 1].name}</h1>
          </Card>
          <Card style={{ marginTop: "20px", padding: "20px", width: "100%" }}>
            <p>Least ordered car type</p>
            <h1 style={{ textAlign: "center" }}>{temp[0].name}</h1>
          </Card>
        </div>}
      </Box>
    </div>
    </>
    
  );
};

export default BranchStats;
