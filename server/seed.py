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
        holly = User(username="hawheeler", password_hash="1234")
        nadia = User(username="nting", password_hash="5678")
        el = User(username="eburleigh", password_hash="7890")
        users = [holly, nadia, el]

        print("Creating projects...")
        rh = Project(
            title="Renovate House", status="not_complete", description=fake.sentence()
        )
        ry = Project(
            title="Renovate Yard", status="in_progress", description=fake.sentence()
        )
        wh = Project(
            title="Big Work Project", status="complete", description=fake.sentence()
        )
        projects = [rh, ry, wh]

        print("Creating tasks...")
        first = Task(title="First task", complete=False, users=holly, project=rh)
        second = Task(title="Second task", complete=True, users=nadia, project=ry)
        third = Task(title="Third task", complete=False, users=el, project=wh)
        fourth = Task(title="Get new cabinets", complete=False, users=holly, project=rh)
        fifth = Task(title="Call contractor", complete=False, users=holly, project=rh)
        sixth = Task(title="Choose tile for backsplash", complete=False, users=holly, project=rh)
        tasks = [first, second, third, fourth, fifth, sixth]

        db.session.add_all(users)
        db.session.add_all(projects)
        db.session.add_all(tasks)
        db.session.commit()

        print("Seeding done!")
