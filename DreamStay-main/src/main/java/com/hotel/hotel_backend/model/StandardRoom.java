package com.hotel.hotel_backend.model;

public class StandardRoom extends Room {
    public StandardRoom(int roomId, double price) {
        super(roomId, "STANDARD", price);
    }

    @Override
    public double calculatePrice(int nights) {
        return pricePerNight * nights;
    }
}
