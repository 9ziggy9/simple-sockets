from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import User

def user_exists(form, field):
    username = field.data
    user = User.query.filter(User.name == username).first()
    if user:
        raise ValidationError("Username already exists!")

class Signup(FlaskForm):
    username = StringField("username", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired()])
