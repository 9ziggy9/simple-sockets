from flask import (Blueprint,
                   render_template,
                   redirect,
                   url_for)
from ..forms import Signup
from ..models import User

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
        print(user)
        return redirect(url_for("auth.login"))
    return "Bad Data"

@auth.route("/logout")
def logout():
    return "Logout"
