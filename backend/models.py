# backend/models.py

from config import mysql

# --------- USERS ---------
def create_user(name, email, password, role='customer'):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users(name,email,password,role) VALUES (%s,%s,%s,%s)", 
                   (name, email, password, role))
    mysql.connection.commit()
    cursor.close()
    return True

def get_user_by_email(email):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    return user

# --------- VEHICLES ---------
def add_vehicle(user_id, vehicle_name, vehicle_model, vehicle_number):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO vehicles(user_id, vehicle_name, vehicle_model, vehicle_number) VALUES (%s,%s,%s,%s)",
                   (user_id, vehicle_name, vehicle_model, vehicle_number))
    mysql.connection.commit()
    cursor.close()
    return True

def get_vehicles_by_user(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM vehicles WHERE user_id=%s", (user_id,))
    vehicles = cursor.fetchall()
    cursor.close()
    return vehicles

# --------- SERVICES ---------
def get_all_services():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM services")
    services = cursor.fetchall()
    cursor.close()
    return services

# --------- BOOKINGS ---------
def create_booking(user_id, vehicle_id, service_id, booking_date, booking_time):
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO bookings(user_id, vehicle_id, service_id, booking_date, booking_time) 
                      VALUES (%s,%s,%s,%s,%s)""", 
                   (user_id, vehicle_id, service_id, booking_date, booking_time))
    mysql.connection.commit()
    cursor.close()
    return True

def get_bookings_by_user(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM bookings WHERE user_id=%s", (user_id,))
    bookings = cursor.fetchall()
    cursor.close()
    return bookings

def update_booking_status(booking_id, status):
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE bookings SET status=%s WHERE booking_id=%s", (status, booking_id))
    mysql.connection.commit()
    cursor.close()
    return True