import React from "react";
import { useLocation } from "react-router-dom";

const Candidates = () => {
    const { state } = useLocation();
    const { id, color } = state; 
  return <div>Candidates {id} {color}</div>;
};

export default Candidates;
