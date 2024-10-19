import React from "react";
import "./Seat.css";

const Seat = ({ seat }) => {
  return (
    <div className={`seat ${seat.isBooked ? "booked" : "available"}`}>
      {seat.seatNumber}
    </div>
  );
};

export default Seat;
