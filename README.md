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
