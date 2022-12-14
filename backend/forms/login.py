from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import User

def user_exists(form, field):
    name = field.data
    user = User.query.filter(User.name == name).first()
    if not user:
        raise ValidationError("Username provided not found!")

def password_matches(form, field):
    password = field.data
    print("FORM DATA", form.data)
    name = form.data["name"]
    user = User.query.filter(User.name == name).first()
    print("USERNAMNE", name)
    if not user:
        raise ValidationError("No such user exists.")
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")

class Login(FlaskForm):
    name = StringField("name", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired(),
                                                   password_matches])
