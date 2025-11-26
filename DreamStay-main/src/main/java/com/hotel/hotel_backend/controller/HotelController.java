package com.hotel.hotel_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.hotel.hotel_backend.model.*;
import com.hotel.hotel_backend.exception.HotelException;
import com.hotel.hotel_backend.service.HotelManager;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HotelController {

    private HotelManager manager = new HotelManager();

    public HotelController() {
        manager.loadAll();
    }

    @GetMapping("/rooms")
    public Room[] getRooms(@RequestParam(defaultValue = "ANY") String type) {
        return manager.searchRooms(type);
    }

    @GetMapping("/bookings")
    public Booking[] getBookings() {
        manager.loadAll();
        return manager.getAllBookings();
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookRoom(@RequestParam int roomId,
                                      @RequestParam String name,
                                      @RequestParam String mobile,
                                      @RequestParam String checkIn,
                                      @RequestParam String checkOut) {
        try {
            LocalDate in = LocalDate.parse(checkIn);
            LocalDate out = LocalDate.parse(checkOut);

            // Validate dates
            if (!out.isAfter(in)) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Check-out must be after check-in"));
            }

            Booking booking = manager.bookRoom(roomId, name, mobile, in, out);
            return ResponseEntity.ok(booking);

        } catch (HotelException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestParam int roomId) {
        try {
            manager.checkOut(roomId);
            return ResponseEntity.ok(Map.of("message", "Checked out successfully for room " + roomId));
        } catch (HotelException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @GetMapping("/status")
    public String status() {
        return "✅ Server is up and running. All services OK!";
    }
}
