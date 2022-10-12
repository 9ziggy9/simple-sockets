from flask import (Blueprint, render_template,
                   redirect, url_for, flash)
from werkzeug.security import (generate_password_hash,
                               check_password_hash)
from ..forms import Signup
from ..models import db, User

auth = Blueprint("auth", __name__)

@auth.route("/login")
def login():
    return render_template("login.html")

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
def logout():
    return "Logout"
