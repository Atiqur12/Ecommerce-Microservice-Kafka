#!/bin/bash

echo "Starting Docker infrastructure..."
docker-compose up -d

echo "Waiting for Kafka to be ready..."
sleep 10

mkdir -p logs

echo "Starting order-service..."
(cd order-service && npm run start:dev > ../logs/order-service.log 2>&1) &

echo "Starting inventory-service..."
(cd inventory-service && npm run start:dev > ../logs/inventory-service.log 2>&1) &

echo "Starting notification-service..."
(cd notification-service && npm run start:dev > ../logs/notification-service.log 2>&1) &

echo "Starting frontend..."
(cd ecommerce-frontend && npm run dev > ../logs/frontend.log 2>&1) &

echo "All services starting. Logs available in ./logs/"
wait