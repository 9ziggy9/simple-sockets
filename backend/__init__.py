from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from .models import db
from .routes import auth as auth_blueprint
from .routes import main as main_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    app.register_blueprint(auth_blueprint, url_prefix="/api")
    app.register_blueprint(main_blueprint, url_prefix="/api")

    return app
