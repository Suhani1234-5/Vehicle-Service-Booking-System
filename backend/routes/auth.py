from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from config import app, mysql

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data['name']
    email = data['email']
    password = generate_password_hash(data['password'])
    
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users(name,email,password) VALUES (%s,%s,%s)", (name,email,password))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({"message":"User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    
    if user and check_password_hash(user[3], password):
        return jsonify({"message":"Login successful", "user_id":user[0], "role":user[4]})
    else:
        return jsonify({"message":"Invalid credentials"}), 401
