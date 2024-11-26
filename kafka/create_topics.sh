#!/bin/bash

# Wait for Zookeeper and Kafka
echo "Waiting for Zookeeper to start..."
while ! nc -z zookeeper 2181; do
  sleep 1
done
echo "Zookeeper is ready!"

echo "Waiting for Kafka to start..."
while ! nc -z kafka 9092; do
  sleep 1
done
echo "Kafka is ready!"

# Function to create a topic if it doesn't already exist
create_topic_if_not_exists() {
  topic=$1
  partitions=$2
  replication=$3
  config=$4

  # Check if the topic already exists
  kafka-topics --bootstrap-server localhost:9092 --list | grep -q "^${topic}$"
  if [ $? -eq 0 ]; then
    echo "Topic '${topic}' already exists. Skipping creation."
  else
    kafka-topics --create \
      --topic "${topic}" \
      --bootstrap-server localhost:9092 \
      --partitions "${partitions}" \
      --replication-factor "${replication}" \
      --config "${config}"
    echo "Topic '${topic}' created successfully."
  fi
}

# Create topics for Kafka Connect
create_topic_if_not_exists "connect-configs" 1 1 "cleanup.policy=compact"
create_topic_if_not_exists "connect-offsets" 1 1 "cleanup.policy=compact"
create_topic_if_not_exists "connect-statuses" 1 1 "cleanup.policy=compact"
