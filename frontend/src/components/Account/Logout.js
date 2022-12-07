import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "../../css/rent.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Logout = () => {
  const navigate = useNavigate();

  const logout = setTimeout(() => {
    navigate("/");
  }, 1000);

  return (
    <>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <div style={{textAlign:'center', justifyContent:'center'}}>
          <Typography variant='h5'>Logging out</Typography>
          <CircularProgress>{logout}</CircularProgress>
        </div>
      </div>
    </>
  );
};

export default Logout;
