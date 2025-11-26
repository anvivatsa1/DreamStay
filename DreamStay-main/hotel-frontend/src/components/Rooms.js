import React, { useEffect, useState } from "react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Room ID</th>
              <th>Type</th>
              <th>Price per Night (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.roomId}>
                <td>{room.roomId}</td>
                <td>{room.type}</td>
                <td>{room.pricePerNight}</td>
                <td>{room.booked ? "Booked" : "Available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
