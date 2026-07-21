#!/bin/bash

echo "Starting Docker infrastructure..."
docker-compose up -d

echo "Waiting for Kafka to be ready..."
sleep 10

echo "Starting order-service..."
cd order-service && npm run start:dev &

echo "Starting inventory-service..."
cd ../inventory-service && npm run start:dev &

echo "Starting notification-service..."
cd ../notification-service && npm run start:dev &

echo "All services starting. Check individual logs above."
wait