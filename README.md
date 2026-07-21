## Services

- **order-service** — REST API for customers. Accepts POST /orders, saves the order to MongoDB, publishes an order-created event to Kafka.

- **inventory-service** — A hybrid app: exposes REST endpoints (POST /products) for admin stock management, and independently consumes order-created events, checking and decrementing real stock, then publishing stock-reserved or stock-unavailable.

- **notification-service** — Consumes both outcome topics and logs a simulated customer notification.

## Tech Stack

NestJS, TypeScript, Apache Kafka + Zookeeper (Docker Compose), MongoDB, Kafka UI.

## Setup

```bash
docker-compose up -d
cd order-service && npm install && npm run start:dev
cd inventory-service && npm install && npm run start:dev
cd notification-service && npm install && npm run start:dev
```

Kafka UI available at http://localhost:8085
EOF