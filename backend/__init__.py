from flask import Flask, jsonify
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
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

    # Build docs from docstrings in view functions!
    # @app.route("/api/help")
    # def api_help():
    #     route_list = { rule.rule: app.view_functions[rule.endpoint].__doc__
    #                    for rule in app.url_map.iter_rules()
    #                    if rule.endpoint != 'static' }
    #     return route_list

    # FIXMEEEEE: csrf injection is not very safe,
    # we should use stateless mechanism to do this--custom headers?
    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=False,
            samesite=None,
            httponly=True
        )
        return response

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    return app
