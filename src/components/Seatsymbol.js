import React from "react";
import "./Seat.css";

const Seatsymbol = ({ Seatsymbol }) => {
  console.log(Seatsymbol);
  
  return (
    <div className={`seat ${Seatsymbol}`}>
      {Seatsymbol === "booked" && "Seat Booked"}
      {Seatsymbol === "available" && "Seat Available"}
    </div>
  );
};

export default Seatsymbol;
