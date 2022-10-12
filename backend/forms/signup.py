from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class Signup(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    password = StringField("password", validators=[DataRequired()])
