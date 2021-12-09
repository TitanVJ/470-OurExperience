# Greg and TAs
Go to [instructor_ta_instructions.md](./markdown/instructor_ta.md)

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
