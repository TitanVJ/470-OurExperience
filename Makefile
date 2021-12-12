setup:
	git submodule update --init
	./setup.sh

build:
	docker-compose build

up:
	docker-compose up -d

up-p:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

up-proj:
	make up
	sleep 15
	make migrate
	make seed

down:
	docker-compose down

stop:
	docker-compose stop

up-production:
	make up-p
	sleep 15
	make migrate
	make seed

migrate:
	docker exec ts-node-express node_modules/.bin/knex migrate:latest

rollback:
	docker exec ts-node-express node_modules/.bin/knex migrate:rollback

seed:
	docker exec ts-node-express node_modules/.bin/knex seed:run