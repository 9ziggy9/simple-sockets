from flask import Flask
from flask import jsonify
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .commands import seed_commands, select_commands
from flask_login import LoginManager
from flask_cors import CORS

from .models import db, User
from .routes import auth as auth_blueprint
from .routes import main as main_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    # CORS policy takes all cross-site origins! See docs for ammendments.
    CORS(app)

    app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
    app.register_blueprint(main_blueprint, url_prefix="/api")

    app.cli.add_command(seed_commands)
    app.cli.add_command(select_commands)

    login_manager = LoginManager(app)
    login_manager.login_view = "auth.unauthorized"

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Build docs from docstrings in view functions!
    # @app.route("/api/help", methods = ["GET"])
    # def help():
    #     func_list = {}
    #     for rule in app.url_map.iter_rules():
    #         if rule.endpoint != "static":
    #             func_list[rule.rule] = app.view_functions[rule.endpoint].__doc__
    #     return jsonify(func_list)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    return app
