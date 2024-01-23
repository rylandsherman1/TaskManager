from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource

from models import db

#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Task, Project, User

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"

# class ProjectByStatus(Resource):
#     pass

# api.add_resource(ProjectByStatus, '/<str:status>}')

class Tasks(Resource):
    pass

api.add_resource(Tasks, '/tasks')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
