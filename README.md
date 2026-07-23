## Services

- **order-service** (port 3000) — REST API for customers. Accepts `POST /orders`, saves the order as `pending`, and publishes an `order-created` event to Kafka. Also consumes `stock-reserved`/`stock-unavailable` events to update the order's final status to `confirmed` or `failed`.

- **inventory-service** (port 3001) — A hybrid app: exposes REST endpoints (`/products`) for admin stock management with full CRUD, and independently consumes `order-created` events. Uses an atomic MongoDB `findOneAndUpdate` to check and decrement stock in a single operation, preventing race conditions on concurrent orders. Publishes `stock-reserved` or `stock-unavailable` depending on outcome.

- **notification-service** — Pure Kafka consumer, no REST endpoints. Consumes both outcome topics and logs a simulated customer notification.

- **ecommerce-frontend** (port 5173) — React + TypeScript UI with client-side routing.

## Tech Stack

NestJS, TypeScript, Apache Kafka + Zookeeper, MongoDB, Docker Compose, Kafka UI, React + Vite.

## Setup

Requires Docker Desktop running.

```bash
docker compose up --build
```

This single command builds and starts everything — Kafka, Zookeeper, Kafka UI, MongoDB, and all four application services — with health checks ensuring dependent services wait for Kafka/MongoDB to be genuinely ready before starting.

- Frontend: `http://localhost:5173`
- Order API: `http://localhost:3000`
- Inventory/Product API: `http://localhost:3001`
- Kafka UI: `http://localhost:8085`