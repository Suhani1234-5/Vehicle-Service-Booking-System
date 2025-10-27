# backend/routes/bookings.py

@app.route('/bookings', methods=['POST'])
def book_service():
    data = request.json
    user_id = data['user_id']
    vehicle_id = data['vehicle_id']
    service_id = data['service_id']
    booking_date = data['booking_date']
    booking_time = data['booking_time']
    
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO bookings(user_id, vehicle_id, service_id, booking_date, booking_time) VALUES (%s,%s,%s,%s,%s)",
                   (user_id, vehicle_id, service_id, booking_date, booking_time))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message":"Booking created successfully"})
