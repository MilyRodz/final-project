from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Appointment, Speciality, Specialist, Working_hours
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from api.services import check_available_time_specialist

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
def handle_hello():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    response_body = {
        "users": users
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_a_user():
    email = request.json['email']
    password = request.json['password']    
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    phone = request.json['phone']

    new_user = User(email=email, password=password, first_name=first_name, last_name=last_name, phone=phone)

    db.session.add(new_user)
    db.session.commit()

    return jsonify("usuario creado"), 200


@api.route('/hash', methods=['POST', 'GET'])
def handle_hash():

    expiration = datetime.timedelta(days=1)
    access_token = create_access_token(identity=user.email, expires_delta=expiration)
    response_token = {
        "users": user.email,
        "token": access_token
    }
    return jsonify(response_token), 200


@api.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':        
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        
    if not email:
        return jsonify({"msg":"Email required"}), 400
    if not password:
        return jsonify({"msg":"Password required"}), 400
    
    user = User.query.filter_by(email=email).first()    

    if not user:
        return jsonify({"msg": "The email is not correct",
        "status": 401 }), 401
    if not check_password_hash(user.password, password):
         return jsonify({"msg": "The password is not correct",
         "status": 401
         }), 400

    expiracion = datetime.timedelta(days=3)
    access_token = create_access_token(identity=user.email, expires_delta=expiracion)

    data = {
        "user": user.serialize(),
        "token": access_token,
        "expires": expiracion.total_seconds()*1000,
        "userId": user.id
    }

    return jsonify(data), 200


@api.route('/register', methods=['POST'])
def register(): 
    email = request.json.get("email", None)
    password = request.json.get("password", None)    
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    phone = request.json.get('phone', None)
    
    if not email:
        return jsonify({"msg": "Email is required"}), 400    
    if not password:
        return jsonify({"msg": "Password is required"}), 400
    if not first_name:
        return jsonify({"msg": "First Name is required"}), 400
    if not last_name:
        return jsonify({"msg": "Last Name is required"}), 400
    if not phone:
        return jsonify({"msg": "Phone Number is required"}), 400

    email_query = User.query.filter_by(email=email).first()
    if email_query:
        return jsonify({"msg": "This email has been already taken"}), 400
        
    
    user = User()
    user.email = email
    user.is_active= True
    user.first_name= first_name
    user.last_name= last_name
    user.phone = phone
    user.reset_password = 0
    #user.username = username
    hashed_password = generate_password_hash(password)
    user.password = hashed_password
    print(email)
    db.session.add(user)
    db.session.commit()

    response = {
        "msg": "Added successfully",        
    }
    return jsonify(response), 200




@api.route('/reservar', methods=['POST'])
def booking():
    user_id = request.json['user_id']
    user_exists = bool(User.query.filter_by(id = user_id).first())

    if user_exists:
        user_id = request.json['user_id']
        speciality_id = request.json['speciality_id']
        specialist_id = request.json['specialist_id']
        working_hour_id = request.json['working_hour_id']
        pet_name = request.json['pet_name']
        pet = request.json['pet']
        date = request.json['date']        

        new_appointment = Appointment(
                user_id=user_id, 
                speciality_id=speciality_id, 
                specialist_id=specialist_id,
                working_hour_id=working_hour_id,
                pet_name=pet_name,
                pet=pet,
                date=date                
            )
    else:
        return jsonify("no existe el usuario"), 404

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify("Hora agendada"), 200


@api.route('/reservas',methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    appointments = list(map(lambda x: x.serialize(), appointments))

    response_body = {
        "appointments": appointments,
    }

    return jsonify(response_body), 200

@api.route('/cancelar/<int:id>',methods=['DELETE'])
def cancel_booking(id):
    appointment_exists = Appointment.query.get_or_404(id)
    if appointment_exists:
            
        db.session.delete(appointment_exists)
        db.session.commit()
        return jsonify('Reserva cancelada!'), 200
    else:
        return jsonify("no existe la reserva"), 404

@api.route('/editar/<int:id>',methods=['PUT'])
def edit_booking(id):
    appointment_exists = Appointment.query.filter_by(id=id).first_or_404()
    if appointment_exists:
        updated_appointment = request.json['date']
            
        appointment_exists.date = updated_appointment
        db.session.commit()
        return jsonify('Reserva actualizada!'), 200
    else:
        return jsonify("no existe la reserva"), 404

@api.route('/especialidad',methods=['POST'])
def create_speciality():
    name = request.json['name']

    new_speciality = Speciality(name=name)

    db.session.add(new_speciality)
    db.session.commit()

    return jsonify("especialidad creada"), 200


@api.route('/especialista',methods=['POST'])
def create_specialist():
    name = request.json['name']
    speciality_id = request.json['speciality_id']

    new_specialist = Specialist(name=name, speciality_id=speciality_id)

    db.session.add(new_specialist)
    db.session.commit()

    return jsonify("especialista creado"), 200


@api.route('/data-especialities',methods=['GET'])
def get_data_specialities():
    specialities = Speciality.query.all()
    specialities = list(map(lambda x: x.serialize(), specialities))

    specialists = Specialist.query.all()
    specialists = list(map(lambda x: x.serialize(), specialists))

    response_body = {
        "specialities": specialities,
        "specialists": specialists
    }
    return jsonify(response_body), 200

@api.route('/working-hours', methods=['POST'])
def add_working_hours():
    
    speciality_id = request.json['speciality_id']
    specialist_id = request.json['specialist_id']
    time = request.json['time']

    new_working_hour = Working_hours(speciality_id=speciality_id, specialist_id=specialist_id,time=time)

    db.session.add(new_working_hour)
    db.session.commit()
    
    return jsonify({ "msg": "hora de especialidad asignada"}), 200

@api.route('/working-hours', methods=['GET'])
def get_working_hours():
    list_working_hours = Working_hours.query.all()
    list_working_hours = list(map(lambda x: x.serialize(), list_working_hours))

    response_body = {
        "working-hours": list_working_hours
    }
    return jsonify(response_body), 200

@api.route('/available-times', methods=['POST'])
def get_available_times():
    
    id_speciality = request.json['id_speciality']
    id_specialist = request.json['id_specialist']
    date = request.json['date']
    user_id = request.json['user_id']

    response = check_available_time_specialist(id_speciality, id_specialist, date, user_id)
    response = list(map(lambda x: x.serialize(), response))    
    if response:
        return jsonify(response), 200
    else:
        return jsonify([]), 205

@api.route('/validation', methods=['POST'])
def get_reset_pass():

    email = request.json.get("email", None)
    token = request.json.get("tokenNumber", None)

    if not email:
        return jsonify({'msg':'Error de Validacion'}), 201

    if not token:
        return jsonify({'msg':'Error de Validacion'}), 201

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'msg':'Error de Validacion'}), 201

    user.password = randint(100000, 900000)
    user.reset_password = token
    print(user)
    db.session.commit()

    response={
        'msg': 'Token Modificado'
    }

    return jsonify(response), 201

    @api.route('/resetPassword', metohds=['POST'])
    def get_modify_pass():
        token = request.json.get('tokenNumber', None)
        password = request.json.get('password', None)

        if not token:
            return 'Error, intentar Nuevamente', 401
        if not password:
            return 'Error, intentar Nuevamente', 401

        selectedUser = User.query.filter_by(reset_password=token).first()

        selectedUser.reset_password = 0
        selectedUser.password = password
        print(selectedUser)
        db.session.commit() 

        response={
            'msg': 'Modificado Exitosamente'
        }
        return jsonify(response), 200