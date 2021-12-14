# Build Instructions:
* Production: `make go-production`
* Development: `make go-development`

After building, navigate to http://localhost:8080
### Troubleshooting
If db connection errors occur while building, try to `make migrate` and `make seed` manually.

You will be directed to CAS login.
## Admin Login
* Username: `ggbaker`
* Password: `lisp_#1`

## Student Logins
1. 
    * Username: `test`
    * Password: `password`

2. 
    * Username: `newUser`
    * Password: `secret`

If you logout, you must navigate back to http://localhost:8080 to login again due to problems with the CAS server.

# Features

* Job Postings/Companies:
    * Student: View job postings, view single job posting, apply for job, cancel job application
    * Admin: Delete (if no student has applied), edit, and create job postings, add and delete companies (if no job postings)

* Events:
    * Student: View list of all events and single event details, register for events if capacity isn't reached and date hasn't passed, unregister for events if event hasn't happened, see calendar view of logged in student's registered events (can click on the event in the calendar to go to that event page)

* Documents:
    * Student: Upload pdf documents from the profile page, view/delete/download your documents from documents page

* Admin dashboard:
    * Summarize number of companies and job postings

### Unimplemented Features
* Admin: Control of events, managing job applications

# Project Build and Deploy Instructions

Proceed with Section A if:

1. This is your first time setting up the environment
1. New dependencies were added

Otherwise proceed to Section B

## Section A
Instructions on setting up the build (From the ./ directory)

 * `make setup`

## Section B
Steps to run (From the ./ directory)

 * `make build`
 * `make up`

To visit the serverside

 * Go to the following URL: [http://localhost:5000/](http://localhost:5000/)

To shut down the Docker containers (From the ./ directory)

 * `make stop`

### **If permission is denied, do the following**

 * `chmod +x setup.sh`
 * `./setup.sh`

### CAS Stuff

The cas server will build along side everything else following the above make commands. Ensure you've fun the following commands to setup the db tables and entries, otherwise good luck logging in :
```
    make migrate
    make seed
```

To avoid have to login during development set the `CAS_DEV_MODE` env variable to true in [.env](./.env). When this is set to true the cas_user session field will be set to whatever `CAS_DEV_USER` environement variable is set to.

# Adminer/DB Mysql login
 * System: MySQL
 * Server: mysql
 * Username: mysql
 * password: password
 * database: db470
