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