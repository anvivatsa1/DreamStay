package com.hotel.hotel_backend.model;

public class DeluxeRoom extends Room {
    public DeluxeRoom(int roomId, double price) {
        super(roomId, "DELUXE", price);
    }

    @Override
    public double calculatePrice(int nights) {
        return (pricePerNight * nights) + 1000; // extra service charge
    }
}
