# NOTE: THIS IS A CLONE OF THE ORIGINAL REPOSITORY FROM SFU GITLAB
----
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

* User Login: 
    * Implemented CAS server to emulate SFU style login
    
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

