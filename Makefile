setup:
	./setup.sh

submoduleInit:
	git submodule update --init

build:
	docker-compose build

up:
	docker-compose up -d

up-p:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

up-proj:
	make up
	sleep 25
	make migrate
	make seed

down:
	docker-compose down

stop:
	docker-compose stop

up-production:
	make up-p
	sleep 25
	make migrate
	make seed

go-production:
	./setup.sh
	make submoduleInit
	make build
	make up-production

go-development:
	./setup.sh
	make submoduleInit
	make build
	make up-proj

migrate:
	docker exec ts-node-express node_modules/.bin/knex migrate:latest

rollback:
	docker exec ts-node-express node_modules/.bin/knex migrate:rollback

seed:
	docker exec ts-node-express node_modules/.bin/knex seed:run