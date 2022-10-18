from flask import (Blueprint, render_template,
                   redirect, url_for, flash, request)
from werkzeug.security import (generate_password_hash,
                               check_password_hash)
from ..forms import Signup, Login
from ..models import db, User
from flask_login import (login_user, logout_user,
                         login_required, current_user)

auth = Blueprint("auth", __name__)

# template route
# @auth.route("/login")
# def login():
#     form = Login()
#     return render_template("login.html", form=form)

def gen_err_response(form_errors):
    return [f"{k}: {err}"
            for k,errs in form_errors.items()
            for err in errs]

@auth.route("/")
def authenticate():
    """Authenticates a user"""
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}

@auth.route("/unauthorized")
def unauthorized():
    """Returns unauthorized JSON when flask-login auth fails"""
    return {"errors": ["Unauthorized"]}, 401

@auth.route("/login", methods=["POST"])
def login_post():
    """Logs a user in"""
    form = Login()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User.query.filter(User.name == form.data["name"]).first()
        login_user(user)
        return user.to_dict(), 200
    return {"errors": gen_err_response(form.errors)}, 401

@auth.route("/logout")
def logout():
    """Logs a user out"""
    logout_user()
    return {"message": "User logged out"}

@auth.route("/signup")
def signup():
    form = Signup()
    return render_template("signup.html", form=form)

@auth.route("/signup", methods=["POST"])
def signup_post():
    form = Signup()
    if form.validate_on_submit():
        user = User()
        form.populate_obj(user)
        existing_user = User.query.filter_by(name=user.name).first()
        if existing_user:
            return "User done existed"
        new_user = User(name=user.name,
                        password=generate_password_hash(user.password))
        db.session.add(new_user)
        db.session.commit()
    return redirect(url_for("auth.login"))
