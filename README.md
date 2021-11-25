<h1>Project Build and Deploy Instructions</h1>

Proceed with Section A if:

1. This is your first time setting up the environment<br>
2. New dependencies were added<br>

Otherwise proceed to Section B<br>

<h3>Section A</h3>
Instructions on setting up the build (From the ./ directory)

- make setup<br>

<h3>Section B</h3>
Steps to run (From the ./ directory)

- make build<br>
- make up<br>

To visit the serverside

- Go to the following URL: http://localhost:5000/<br>

To shut down the Docker containers (From the ./ directory)

- make stop<br>

\*\*\* If permission is denied, do the following<br>

- chmod +x setup.sh
- ./setup.sh<br>
