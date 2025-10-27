# backend/routes/vehicles.py
@app.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.json
    user_id = data['user_id']
    name = data['vehicle_name']
    model = data['vehicle_model']
    number = data['vehicle_number']
    
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO vehicles(user_id, vehicle_name, vehicle_model, vehicle_number) VALUES (%s,%s,%s,%s)",
                   (user_id, name, model, number))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message":"Vehicle added successfully"})
