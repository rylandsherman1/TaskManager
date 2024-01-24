from flask_sqlalchemy import SQLAlchemy
from itsdangerous import Serializer
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    # add relationships
    tasks = db.relationship("Task", back_populates="users")
    projects = association_proxy("tasks", "project")

    # add serialization rules
    serialize_rules = ("-tasks","-_password_hash")

    # add auth setup
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"User: {self.username}"


class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    # add relationships
    tasks = db.relationship("Task", back_populates="project")
    users = association_proxy("tasks", "users")

    # add serialization rules
    serialize_rules = ("-tasks",)

    def __repr__(self):
        return f"Project: {self.name}, Description: {self.description}, Status: {self.status}"


class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    complete = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    # add relationships
    project = db.relationship("Project", back_populates="tasks")
    users = db.relationship("User", back_populates="tasks")

    # add serialization rules
    serialize_rules = ("-project", "-users")

    # add validations

    def __repr__(self):
        return f"Task: {self.title}, Complete? {self.complete}"
