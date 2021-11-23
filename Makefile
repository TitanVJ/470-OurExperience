setup:
	./setup.sh

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

stop:
	docker-compose stop

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

migrate:
	docker exec ts-node-express node_modules/.bin/knex migrate:latest

rollback:
	docker exec ts-node-express node_modules/.bin/knex migrate:rollback
