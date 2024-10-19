import React, { useEffect, useState } from "react";
import Seat from "./components/Seat";
import "./App.css";
import { getSeats, reserveSeats } from "./services/seatService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [seats, setSeats] = useState([]);
  const [numSeatsToBook, setNumSeatsToBook] = useState(0);
  const [loading, setLoading] = useState(false); // New state for loader

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
      toast.error("Failed to fetch seats.");
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (numSeatsToBook < 1 || numSeatsToBook > 7) {
      alert("You can only book between 1 and 7 seats.");
      return;
    }
    setLoading(true); // Set loading to true when API call starts
    try {
      const response = await reserveSeats(numSeatsToBook);
      toast.success(`Seats booked: ${response.data.bookedSeats.join(", ")}`);
      fetchSeats(); // Refresh seat status
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Backend provided an error message
        toast.error(error.response.data.message);
      } else {
        // Generic error handling
        toast.error("An error occurred while booking seats.");
      }
      console.error("Error booking seats:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
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
            disabled={loading} // Disable input when loading
          />
          <button type="submit" disabled={loading}> {/* Disable button when loading */}
            {loading ? "Reserving..." : "Reserve Seats"}
          </button>{" "}
          {/* Show loader text when loading */}
        </div>
      </form>
      <div className="seat-grid">
        {seats.map((seat) => (
          <Seat key={seat.seatNumber} seat={seat} />
        ))}
      </div>
      <ToastContainer /> {/* Toast notification container */}
    </div>
  );
}

export default App;
