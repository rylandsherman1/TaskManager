# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, Task

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Deleting data...")
        User.query.delete()
        Project.query.delete()
        Task.query.delete()

        print("Creating users...")
        holly = User(username="hawheeler", _password_hash="fldskjva")
        nadia = User(username="nting", _password_hash="wielskdlv")
        el = User(username="eburleigh", _password_hash="lskajvu")
        users = [holly, nadia, el]

        print("Creating projects...")
        rh = Project(
            title="Renovate House", status="Not Complete", description=fake.sentence()
        )
        ry = Project(
            title="Renovate Yard", status="In progress", description=fake.sentence()
        )
        wh = Project(
            title="Big Work Project", status="Complete", description=fake.sentence()
        )
        projects = [rh, ry, wh]

        print("Creating tasks...")
        first = Task(title="First task", complete=False, users=holly, project=rh)
        second = Task(title="Second task", complete=True, users=nadia, project=ry)
        third = Task(title="Third task", complete=False, users=el, project=wh)
        tasks = [first, second, third]

        db.session.add_all(users)
        db.session.add_all(projects)
        db.session.add_all(tasks)
        db.session.commit()

        print("Seeding done!")
