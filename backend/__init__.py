from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .commands import seed_commands, select_commands
from flask_login import LoginManager

from .models import db, User
from .routes import auth as auth_blueprint
from .routes import main as main_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    app.register_blueprint(auth_blueprint, url_prefix="/api")
    app.register_blueprint(main_blueprint, url_prefix="/api")

    app.cli.add_command(seed_commands)
    app.cli.add_command(select_commands)

    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    return app
