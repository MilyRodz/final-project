from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Speciality, Working_hours
from api.utils import generate_sitemap, APIException
import datetime


def check_available_time_specialist(id_speciality):
    response = get_times_by_speciality(id_speciality)
    return response
    
def get_times_by_speciality(id_speciality):
    speciality_response = Speciality.query.get_or_404(id_speciality)
    exist_working_hours = False
    if speciality_response == 404:
        return False
    working_hours = Working_hours.query.filter_by(id=speciality_response.id).first()
    if working_hours:
        return working_hours
    return False
