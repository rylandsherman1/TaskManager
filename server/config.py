# Standard library imports
from os import environ, path

# Remote library imports
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

BASE_DIR = path.abspath(path.dirname(__file__))
DATABASE = environ.get("DB_URI", f"sqlite:///{path.join(BASE_DIR, 'app.db')}")

load_dotenv(".env")


# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key = environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

bcrypt = Bcrypt(app)
