## TaskManager

## Table of Contents

- [Creators](#creators)
- [About](#about)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Creators

# Ryland Sherman

LinkedIn: https://www.linkedin.com/in/ryland-sherman-80a1a72a2/ GitHub: https://github.com/rylandsherman1

# Holly Wheeler

LinkedIn: https://www.linkedin.com/in/holly-a-wheeler/ GitHub: https://github.com/hawheeler96

## About

The TaskManager application is a full-stack task and project management solution designed to empower users in efficiently organizing their tasks and projects. Leveraging the power of SQLAlchemy for seamless database operations, TaskManager offers a user-friendly interface that simplifies data interaction. TaskManager is your go-to platform for streamlined task and project management, helping you stay organized and productive.

## Prerequisites

To run this application, you need Python installed on your system

## Installation

1. copy code: git@github.com:rylandsherman1/TaskManager.git
2. in terminal run git clone git@github.com:rylandsherman1/TaskManager.git
3. cd TaskManager
4. code .
5. To start the server, open terminal and run these commands:
6. pipenv install && pipenv shell
7. cd server
8. flask db init
9. flask db migrate -m "Initial Migration"
10. flask db upgrade
11. python seed.py
12. export FLASK_APP=app.py
13. export FLASK_RUN_PORT=5555
14. flask run
15. Now open a new terminal and input:
16. cd client
17. npm install
18. npm start

## Usage

1. Sign Up or Sign In: Create a unique login experience by signing up for TaskManager or signing in if you already have an account.

2. Explore the Home Page: Once you're signed in, you'll be directed to the home page, where you'll find a selection of projects and tasks available.

3. Navigate with Ease: Utilize our user-friendly navigation bar to filter tasks and projects based on your preferences.

Start organizing your tasks and projects effortlessly with TaskManager today!"

## Features

1. User Authentication: TaskManager allows users to create unique accounts and securely sign in and out for a personalized experience.

2. Create Tasks and Projects: Users can easily create and manage their tasks and projects, helping them stay organized.

3. Browse and Interact: Explore tasks and projects posted by others, and interact with them by editing, deleting, or marking them as complete.

4. Intuitive Controls: Use the intuitive user interface to edit, delete, or complete tasks and projects with just a click.

5. Efficient Navigation: TaskManager's navigation bar simplifies the process of finding and filtering tasks and projects to suit your needs.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

The MIT License (MIT)

Copyright (c) 2023 The Library Management System - Phase 3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files ("Library Management System"), to deal in Library Management System without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of Library Management System, and to permit persons to whom Library Management System is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of Library Management System.

LIBRARY MANAGEMENT SYSTEM IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITHLIBRARY MANAGEMENT SYSTEM OR THE USE OR OTHER DEALINGS IN LIBRARY MANAGEMENT SYSTEM.
