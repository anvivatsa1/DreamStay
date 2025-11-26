package com.hotel.hotel_backend.service;

import com.hotel.hotel_backend.model.*;
import com.hotel.hotel_backend.exception.HotelException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import com.hotel.hotel_backend.model.Booking;
import com.hotel.hotel_backend.model.Guest;
import com.hotel.hotel_backend.model.Room;

public class HotelManager {

    private Room[] rooms;
    private Booking[] bookings;

    public HotelManager() {
        rooms = new Room[0];
        bookings = new Booking[0];
    }

    public void loadAll() {
        rooms = FileHandler.loadRooms();
        bookings = FileHandler.loadBookings();
    }

    
    public void saveAll() {
        FileHandler.saveRooms(rooms);
        FileHandler.saveBookings(bookings);
    }

    
    public Room[] searchRooms(String type) {
        int count = 0;
        for (Room r : rooms) {
            if (!r.isBooked() && (type.equals("ANY") || r.getType().equals(type))) {
                count++;
            }
        }

        Room[] available = new Room[count];
        int index = 0;
        for (Room r : rooms) {
            if (!r.isBooked() && (type.equals("ANY") || r.getType().equals(type))) {
                available[index++] = r;
            }
        }
        return available;
    }

    public Booking bookRoom(int roomId, String guestName, String mobile,
                            LocalDate checkIn, LocalDate checkOut) throws HotelException {

        Room room = findRoom(roomId);
        if (room == null) throw new HotelException("Room not found!");
        if (room.isBooked()) throw new HotelException("Room already booked!");

        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        if (nights <= 0) throw new HotelException("Invalid stay duration!");
        
        double total = room.calculatePrice((int) nights);
        Guest guest = new Guest(guestName, mobile);
        Booking booking = new Booking(roomId, guest, checkIn, checkOut, total);

        room.setBooked(true);
        bookings = addBooking(bookings, booking);
        saveAll();

        return booking;
    }

    
    public void checkIn(int roomId) throws HotelException {
        Room r = findRoom(roomId);
        if (r == null || !r.isBooked()) throw new HotelException("Room not booked yet!");
        System.out.println("Guest checked in for Room " + roomId);
    }

    
    public void checkOut(int roomId) throws HotelException {
        Room r = findRoom(roomId);
        if (r == null || !r.isBooked()) throw new HotelException("Room not occupied!");
        r.setBooked(false);
        saveAll();
        System.out.println("Checked out successfully for Room " + roomId);
    }

    
    public void printAllBookings() {
        if (bookings.length == 0) {
            System.out.println("No bookings yet.");
            return;
        }
        System.out.println("Booking History:");
        for (Booking b : bookings) {
            if (b != null) System.out.println(b);
        }
    }

    public void printAllRooms() {
        System.out.println("Rooms:");
        for (Room r : rooms) {
            if (r != null) System.out.println(r);
        }
    }


    private Room findRoom(int id) {
        for (Room r : rooms) {
            if (r != null && r.getRoomId() == id) return r;
        }
        return null;

    }

    public int getTotalRooms() { 
      return rooms.length; 
    }

    public int getTotalBookings() { 
      return bookings.length; 
    }
    
    private Booking[] addBooking(Booking[] arr, Booking newBooking) {
        Booking[] newArr = new Booking[arr.length + 1];
        for (int i = 0; i < arr.length; i++) newArr[i] = arr[i];
        newArr[arr.length] = newBooking;
        return newArr;
    }

    public Booking[] getAllBookings() {
    return bookings;
}

}

