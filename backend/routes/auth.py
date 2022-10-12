from flask import (Blueprint, render_template,
                   redirect, url_for, flash)
from werkzeug.security import (generate_password_hash,
                               check_password_hash)
from ..forms import Signup, Login
from ..models import db, User
from flask_login import (login_user, logout_user,
                         login_required, current_user)

auth = Blueprint("auth", __name__)

@auth.route("/login")
def login():
    form = Login()
    return render_template("login.html", form=form)

@auth.route("/login", methods=["POST"])
def login_post():
    form = Login()
    if form.validate_on_submit():
        user = User()
        form.populate_obj(user)
        existing_user = User.query.filter_by(name=user.name).first()
        if not existing_user or not check_password_hash(existing_user.password,
                                                        user.password):
            return "LOGIN NO BUENO MY DUDES"
        # Note that providing remember=remember, where remember is bool will
        # login_user(user, remember=True) ??
        # allow for peristent sessions!
        login_user(existing_user)
    return redirect(url_for("main.profile"))


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

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main.index"))
