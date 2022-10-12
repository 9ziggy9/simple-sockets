from os import environ

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL") or \
        "sqlite:///dev.db"
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
