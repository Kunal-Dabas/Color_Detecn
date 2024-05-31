/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    Typography,
    TextField,
  } from "@mui/material";
  import { useState, useEffect } from 'react';
  
  const ChildComponent = ({ data }) => {
    const parsedData = Object.entries(data).map(([key, values]) => (
      <div key={key}>
        <h2>{key}</h2>
        <ul>
          {values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    ));
  
    return (
      <div>
      <Box
        width={"50%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        {parsedData}
        </Box>
      </div>
    );
  };
  
  export default ChildComponent;