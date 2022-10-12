from ..models import db, User
from flask.cli import AppGroup

def seed_users():
    debug = User(name="debug",password="debug")
    db.session.add(debug)
    db.session.commit()

def undo_users():
    db.session.execute("DELETE FROM users")
    db.session.commit()

seed_commands = AppGroup("seed")
@seed_commands.command("all")
def seed():
    seed_users()

@seed_commands.command("undo")
def undo():
    undo_users()

@seed_commands.command("restore")
def restore():
    db.drop_all()
    db.create_all()

select_commands = AppGroup("select")
@select_commands.command("users")
def select_users():
    print("Printing all users...")
    users = db.engine.execute("SELECT * FROM users")
    print(users.fetchall())
