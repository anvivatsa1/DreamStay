import React, { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Guest Name</th>
              <th>Mobile</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={index}>
                <td>{b.roomId}</td>
                <td>{b.guest.name}</td>
                <td>{b.guest.mobile}</td>
                <td>{b.checkIn}</td>
                <td>{b.checkOut}</td>
                <td>{b.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
