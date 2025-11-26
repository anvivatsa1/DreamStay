package com.hotel.hotel_backend.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Booking {
    private int roomId;
    private Guest guest;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private double totalAmount;

    public Booking(int roomId, Guest guest, LocalDate checkIn, LocalDate checkOut, double totalAmount) {
        this.roomId = roomId;
        this.guest = guest;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalAmount = totalAmount;
    }

    public int getRoomId() { return roomId; }
    public Guest getGuest() { return guest; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public double getTotalAmount() { return totalAmount; }

    @Override
    public String toString() {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return String.format("Room %d | %s | %s to %s | ₹%.2f",
                roomId, guest, checkIn.format(fmt), checkOut.format(fmt), totalAmount);
    }
}
