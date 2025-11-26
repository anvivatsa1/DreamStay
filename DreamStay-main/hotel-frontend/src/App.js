import React from "react";
import Rooms from "./components/Rooms";
import BookRoom from "./components/BookRoom";
import Bookings from "./components/Bookings";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1>🏨 Hotel Booking System</h1>
      <Rooms />
      <BookRoom />
      <Bookings />
    </div>
  );
}

export default App;

