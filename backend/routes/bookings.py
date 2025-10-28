from flask import request, jsonify
from config import mysql
import MySQLdb

@app.route('/bookings', methods=['POST'])
def book_service():
    data = request.json
    user_id = data['user_id']
    vehicle_id = data['vehicle_id']
    service_id = data['service_id']
    booking_date = data['booking_date']
    booking_time = data['booking_time']

    cursor = mysql.connection.cursor()

    try:
        # Check if same vehicle already booked at same date/time
        cursor.execute("""
            SELECT * FROM bookings 
            WHERE vehicle_id=%s AND booking_date=%s AND booking_time=%s
        """, (vehicle_id, booking_date, booking_time))
        existing = cursor.fetchone()

        if existing:
            return jsonify({
                "error": "This vehicle already has a booking at that time."
            }), 400

        # Create booking with default 'pending' status
        cursor.execute("""
            INSERT INTO bookings(user_id, vehicle_id, service_id, booking_date, booking_time, status)
            VALUES (%s,%s,%s,%s,%s,%s)
        """, (user_id, vehicle_id, service_id, booking_date, booking_time, 'pending'))
        mysql.connection.commit()

        return jsonify({"message": "Booking created successfully!"}), 201

    except MySQLdb.Error as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
