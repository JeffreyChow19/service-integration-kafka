#!/bin/bash

KAFKA_CONNECT_URL=http://localhost:8083/connectors

# Post the Hasan Sadikin connector
curl -X POST $KAFKA_CONNECT_URL \
  -H "Content-Type: application/json" \
  -d '{
    "name": "hasan-sadikin-postgres-source",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "tasks.max": "1",
      "database.hostname": "hasan-sadikin-db",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname": "hasan_sadikin_hospital",
      "database.server.name": "hasan-sadikin",
      "slot.name": "hasan_sadikin",
      "publication.name": "hasan_sadikin_publication",
      "table.include.list": "public.*",
      "plugin.name": "pgoutput",
      "topic.prefix": "hasan-sadikin-hospital"
    }
  }'

# Post the Borromeus connector
curl -X POST $KAFKA_CONNECT_URL \
  -H "Content-Type: application/json" \
  -d '{
    "name": "borromeus-postgres-source",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "tasks.max": "1",
      "database.hostname": "borromeus-db",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname": "borromeus_hospital",
      "database.server.name": "borromeus",
      "slot.name": "borromeus",
      "publication.name": "borromeus_publication",
      "table.include.list": "public.*",
      "plugin.name": "pgoutput",
      "topic.prefix": "borromeus-hospital"
    }
  }'
