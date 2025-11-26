package com.hotel.hotel_backend.model;

public abstract class Room {
    protected int roomId;
    protected String type;
    protected double pricePerNight;
    protected boolean isBooked;

    public Room(int roomId, String type, double pricePerNight) {
        this.roomId = roomId;
        this.type = type;
        this.pricePerNight = pricePerNight;
        this.isBooked = false;
    }

    public int getRoomId() { return roomId; }
    public String getType() { return type; }
    public double getPricePerNight() { return pricePerNight; }
    public boolean isBooked() { return isBooked; }
    public void setBooked(boolean booked) { this.isBooked = booked; }

    public abstract double calculatePrice(int nights);

    @Override
    public String toString() {
        return String.format("[%d] %s - ₹%.2f/night (%s)", 
                roomId, type, pricePerNight, (isBooked ? "Booked" : "Available"));
    }
}
