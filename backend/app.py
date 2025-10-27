from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from config import app, mysql
import models
import services

CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Flask backend is running successfully!"})

# --------- Auth Routes ---------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = generate_password_hash(data['password'])
    result = services.register_user(data['name'], data['email'], hashed_password)
    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    result = services.login_user(data['email'], data['password'])
    return jsonify(result)

# --------- Vehicle Routes ---------
@app.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.json
    result = services.add_new_vehicle(
        data['user_id'], data['vehicle_name'], data['vehicle_model'], data['vehicle_number']
    )
    return jsonify(result)

@app.route('/vehicles/<int:user_id>', methods=['GET'])
def get_vehicles(user_id):
    vehicles = services.list_user_vehicles(user_id)
    return jsonify(vehicles)

# --------- Services Routes ---------
@app.route('/services', methods=['GET'])
def get_services():
    services_list = models.get_all_services()
    return jsonify(services_list)

# --------- Booking Routes ---------
@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    result = services.book_service(
        data['user_id'], data['vehicle_id'], data['service_id'],
        data['booking_date'], data['booking_time']
    )
    return jsonify(result)

@app.route('/bookings/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    bookings = services.user_bookings(user_id)
    return jsonify(bookings)

@app.route('/bookings/status', methods=['PUT'])
def update_booking_status():
    data = request.json
    result = services.change_booking_status(data['booking_id'], data['status'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
