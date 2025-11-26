import React, { useState, useEffect } from "react";

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestMobile, setGuestMobile] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedRoomId || !guestName || !guestMobile || !checkInDate || !checkOutDate) {
      alert("Please fill all fields!");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out must be after check-in!");
      return;
    }

    const params = new URLSearchParams({
      roomId: selectedRoomId,
      name: guestName,
      mobile: guestMobile,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    });

    fetch(`http://localhost:8080/api/book?${params.toString()}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) return res.json().then(err => { throw err; });
        return res.json();
      })
      .then((data) => {
        alert(`✅ Room booked successfully for ${data.guest.name}! Total: ₹${data.totalAmount}`);
        setSelectedRoomId("");
        setGuestName("");
        setGuestMobile("");
        setCheckInDate("");
        setCheckOutDate("");
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Error booking room: " + (err.error || err.message || JSON.stringify(err)));
      });
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div>
          <label>Room: </label>
          <select value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)}>
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.roomId} value={r.roomId}>
                {r.roomId} - {r.type} (₹{r.pricePerNight})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Name: </label>
          <input value={guestName} onChange={(e) => setGuestName(e.target.value)} />
        </div>
        <div>
          <label>Mobile: </label>
          <input value={guestMobile} onChange={(e) => setGuestMobile(e.target.value)} />
        </div>
        <div>
          <label>Check-In: </label>
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        </div>
        <div>
          <label>Check-Out: </label>
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Book</button>
      </form>
    </div>
  );
}
