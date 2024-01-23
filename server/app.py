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


class Projects(Resource):
    def get(self):
        projects = [
            project.to_dict(rules=("tasks",)) for project in Project.query.all()
        ]
        return make_response(projects, 200)

    def post(self):
        project = Project()
        data = request.get_json()
        try:
            project.title = data.get("title")
            project.status = data.get("status")
            project.description = data.get("description")
            db.session.add(project)
            db.session.commit()
            return make_response(project.to_dict(), 201)
        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)


api.add_resource(Projects, "/projects")


class ProjectByStatus(Resource):
    def get(self, status):
        projects = [
            project.to_dict(rules=("tasks",))
            for project in Project.query.filter_by(status=status)
        ]
        return make_response(projects, 200)

api.add_resource(ProjectByStatus, "/projects/<string:status>")


class ProjectById(Resource):
    def get(self, id):
        project = Project.query.get(id)
        if not project:
            return make_response({"error": "Project not found"}, 404)
        return make_response(project.to_dict(), 200)

    def patch(self, id):
        project = Project.query.get(id)
        if not project:
            return make_response({"error": "Project not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(project, attr, data[attr])
            db.session.add(project)
            db.session.commit()
            return make_response(project.to_dict(), 202)
        except ValueError:
            return make_response({"errors": "unable to PATCH"}, 400)

    def delete(self, id):
        project = Project.query.get(id)
        if not project:
            return make_response({"error": "Project not found"}, 404)
        db.session.delete(project)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(ProjectById, "/projects/<int:id>")


class Tasks(Resource):
    def get(self):
        tasks = [task.to_dict(rules=("user",)) for task in Task.query.all()]
        return make_response(tasks, 200)

    def post(self):
        task = Task()
        data = request.get_json()
        try:
            task.title = data.get("title")
            task.complete = data.get("complete")
            task.user_id = data.get("user_id")
            task.project_id = data.get("project_id")
            db.session.add(task)
            db.session.commit()
            return make_response(task.to_dict(), 201)
        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)

api.add_resource(Tasks, "/tasks")


class TaskById(Resource):
    def get(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response({"error": "Task not found"}, 404)
        return make_response(task.to_dict(rules=("users",)), 200)

    def patch(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response({"error": "Task not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(task, attr, data[attr])
            db.session.add(task)
            db.session.commit()
            return make_response(task.to_dict(rules=("users",)), 202)
        except ValueError:
            return make_response({"error": "unable to PATCH"})

    def delete(self, id):
        task = Task.query.get(id)
        if not task:
            return make_response({"error": "Task not found"}, 404)
        db.session.delete(task)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(TaskById, "/tasks/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
