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
    add_vehicle(user_id, name, model, number)
    return {"message": "Vehicle added successfully"}

def list_user_vehicles(user_id):
    vehicles = get_vehicles_by_user(user_id)
    return vehicles

# --------- Booking Services ---------
def book_service(user_id, vehicle_id, service_id, date, time):
    create_booking(user_id, vehicle_id, service_id, date, time)
    return {"message": "Booking created successfully"}

def user_bookings(user_id):
    return get_bookings_by_user(user_id)

def change_booking_status(booking_id, status):
    update_booking_status(booking_id, status)
    return {"message": "Booking status updated"}
