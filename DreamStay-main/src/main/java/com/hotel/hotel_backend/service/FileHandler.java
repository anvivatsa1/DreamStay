package com.hotel.hotel_backend.service;

import com.hotel.hotel_backend.model.*;
import java.io.*;
import java.time.LocalDate;


public class FileHandler {

    private static final String ROOMS_FILE = "rooms.txt";
    private static final String BOOKINGS_FILE = "bookings.txt";

    public static Room[] loadRooms() {
        File file = new File(ROOMS_FILE);
        Room[] rooms;

        
        if (!file.exists()) {
            rooms = new Room[5];
            rooms[0] = new StandardRoom(1, 2000);
            rooms[1] = new StandardRoom(2, 2000);
            rooms[2] = new StandardRoom(3, 2000);
            rooms[3] = new DeluxeRoom(4, 3500);
            rooms[4] = new DeluxeRoom(5, 3500);
            saveRooms(rooms);
            return rooms;
        }

        int count = countLines(file);
        rooms = new Room[count];

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            int i = 0;
            while ((line = br.readLine()) != null && i < count) {
                String[] p = line.split(",");
                int id = Integer.parseInt(p[0]);
                String type = p[1];
                double price = Double.parseDouble(p[2]);
                boolean booked = Boolean.parseBoolean(p[3]);

                Room room;
                if (type.equals("STANDARD")) room = new StandardRoom(id, price);
                else room = new DeluxeRoom(id, price);
                room.setBooked(booked);

                rooms[i++] = room;
            }
        } catch (IOException e) {
            System.out.println("Error reading rooms: " + e.getMessage());
        }
        return rooms;
    }

    public static void saveRooms(Room[] rooms) {
        try (PrintWriter pw = new PrintWriter(new FileWriter(ROOMS_FILE))) {
            for (Room r : rooms) {
                if (r != null) {
                    pw.println(r.getRoomId() + "," + r.getType() + "," +
                            r.getPricePerNight() + "," + r.isBooked());
                }
            }
        } catch (IOException e) {
            System.out.println("Error saving rooms: " + e.getMessage());
        }
    }

    public static Booking[] loadBookings() {
        File file = new File(BOOKINGS_FILE);
        if (!file.exists()) return new Booking[0];

        int count = countLines(file);
        Booking[] bookings = new Booking[count];

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            int i = 0;
            while ((line = br.readLine()) != null && i < count) {
                String[] p = line.split(",");
                int roomId = Integer.parseInt(p[0]);
                Guest guest = new Guest(p[1], p[2]);
                LocalDate checkIn = LocalDate.parse(p[3]);
                LocalDate checkOut = LocalDate.parse(p[4]);
                double total = Double.parseDouble(p[5]);

                bookings[i++] = new Booking(roomId, guest, checkIn, checkOut, total);
            }
        } catch (IOException e) {
            System.out.println("Error reading bookings: " + e.getMessage());
        }
        return bookings;
    }

    public static void saveBookings(Booking[] bookings) {
        File file = new File(BOOKINGS_FILE);
        try {
            if (!file.exists()) file.createNewFile();
            try (PrintWriter pw = new PrintWriter(new FileWriter(file))) {
                for (Booking b : bookings) {
                    if (b != null) {
                        pw.println(b.getRoomId() + "," +
                                b.getGuest().getName() + "," +
                                b.getGuest().getMobile() + "," +
                                b.getCheckIn() + "," +
                                b.getCheckOut() + "," +
                                b.getTotalAmount());
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Error saving bookings: " + e.getMessage());
        }
    }

    private static int countLines(File file) {
        int lines = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            while (br.readLine() != null) lines++;
        } catch (IOException e) {
            System.out.println("Error counting lines: " + e.getMessage());
        }
        return lines;
    }
    
    
}
