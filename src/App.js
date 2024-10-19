import React, { useEffect, useState } from "react";
import Seat from "./components/Seat";
import "./App.css";
import { getSeats, reserveSeats } from "./services/seatService";

function App() {
  const [seats, setSeats] = useState([]);
  const [numSeatsToBook, setNumSeatsToBook] = useState(0);

  // Fetch all seats on component mount
  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await getSeats();
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (numSeatsToBook < 1 || numSeatsToBook > 7) {
      alert("You can only book between 1 and 7 seats.");
      return;
    }
    try {
      const response = await reserveSeats(numSeatsToBook);
      alert(`Seats booked: ${response.data.bookedSeats.join(", ")}`);
      fetchSeats(); // Refresh seat status
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Backend provided an error message
        alert(error.response.data.message);
      } else {
        // Generic error handling
        alert("An error occurred while booking seats.");
      }
      console.error("Error booking seats:", error);
    }
  };

  return (
    <div className="App">
      <h1>Seat Reservation System</h1>
      <form onSubmit={handleBooking}>
        {" "}
        {/* Use a form to handle submission */}
        <div className="input-section">
          <label>Number of seats to book (1-7): </label>
          <input
            type="number"
            value={numSeatsToBook}
            onChange={(e) => setNumSeatsToBook(e.target.value)}
            min="1"
            max="7"
          />
          <button type="submit">Reserve Seats</button>{" "}
          {/* Button type submit */}
        </div>
      </form>
      <div className="seat-grid">
        {seats.map((seat) => (
          <Seat key={seat.seatNumber} seat={seat} />
        ))}
      </div>
    </div>
  );
}

export default App;
