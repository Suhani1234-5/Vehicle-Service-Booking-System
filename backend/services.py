# backend/services.py

from models import *
from config import mysql
from werkzeug.security import generate_password_hash, check_password_hash

# --------- User Services ---------
def register_user(name, email, password, role='customer'):
    user_exists = get_user_by_email(email)
    if user_exists:
        return {"error": "User already exists"}
    create_user(name, email, password, role)
    return {"message": "User registered successfully"}


def login_user(email, password):
    user = get_user_by_email(email)
    if user and check_password_hash(user[3], password):
        return {"message": "Login successful", "user_id": user[0], "role": user[4]}
    else:
        return {"error": "Invalid credentials"}


# --------- Vehicle Services ---------
def add_new_vehicle(user_id, name, model, number):
    result = add_vehicle(user_id, name, model, number)
    return result


def list_user_vehicles(user_id):
    """Return all vehicles for a given user as JSON-friendly dicts."""
    vehicles = get_vehicles_by_user(user_id)
    if not vehicles:
        return []

    vehicle_list = [
        {
            "id": v[0],
            "user_id": v[1],
            "vehicle_name": v[2],
            "vehicle_model": v[3],
            "vehicle_number": v[4],
            "created_at": str(v[5]),
        }
        for v in vehicles
    ]
    return vehicle_list


# --------- Booking Services ---------
def book_service(user_id, vehicle_id, service_id, date, time):
    create_booking(user_id, vehicle_id, service_id, date, time)
    return {"message": "Booking created successfully"}


def user_bookings(user_id):
    """Return all bookings for a user as JSON-friendly dicts."""
    bookings = get_bookings_by_user(user_id)
    if not bookings:
        return []

    booking_list = [
        {
            "booking_id": b[0],
            "user_id": b[1],
            "vehicle_id": b[2],
            "service_id": b[3],
            "booking_date": str(b[4]),
            "booking_time": str(b[5]),
            "status": b[6] if len(b) > 6 else "pending",
        }
        for b in bookings
    ]
    return booking_list


def change_booking_status(booking_id, status):
    update_booking_status(booking_id, status)
    return {"message": "Booking status updated"}
