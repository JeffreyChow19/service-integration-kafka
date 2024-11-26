# Variables
KAFKA_CONNECT_URL=http://localhost:8083/connectors

# Default target
.PHONY: all
all: setup

# Start the Docker Compose services
.PHONY: up
up:
	docker-compose up -d

# Stop the Docker Compose services
.PHONY: down
down:
	docker-compose down

# Combined setup: Start services and post connectors
.PHONY: setup
setup: up post-connectors

.PHONY: reset
reset:
	docker-compose down --volumes
	make setup
