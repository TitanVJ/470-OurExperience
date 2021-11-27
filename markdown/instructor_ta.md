# For CMPT 470 TAs AND Greg Baker

Run the following to get up and running:

```
    make setup
    make build

    make up

    make migrate -- this will init the db tables
    make seed    -- this will add some data to the table so you aren't looking at empty pages :)
```
Visit [http://localhost:5000/](http://localhost:5000/) to see the app running.


You can access the db at [http://localhost:9000/](http://localhost:9000/).
Use these credentials to login:
 * System: MySQL
 * Server: mysql
 * Username: mysql
 * password: password
 * database: db470