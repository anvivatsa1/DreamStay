package com.hotel.hotel_backend.model;

public class Guest {
    private String name;
    private String mobile;

    public Guest(String name, String mobile) {
        this.name = name;
        this.mobile = mobile;
    }

    public String getName() { return name; }
    public String getMobile() { return mobile; }

    @Override
    public String toString() {
        return name + " (" + mobile + ")";
    }
}
