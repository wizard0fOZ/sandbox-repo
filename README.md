# Sandbox Repo

This repository contains two small sandbox apps for Azure deployment testing:

- `web-admin`: Vite + React frontend for Static Web Apps verification
- `backend`: Express + Prisma backend for App Service, PostgreSQL, and Blob Storage verification

See the README inside each folder for setup and deployment details.

## Docker sandbox

You can run a full local sandbox with Docker Compose for backend, web UI, PostgreSQL, and Azure Blob Storage emulation.

### Services

- `postgres`: local PostgreSQL database on `localhost:5432`
- `azurite`: local Azure Blob Storage emulator on `localhost:10000`
- `backend`: Express API on `http://localhost:5000`
- `web-admin`: Vite app on `http://localhost:5173`

The Azurite service is started with `--skipApiVersionCheck` so it can accept the newer storage API version used by the current Azure Blob SDK in this sandbox.

### Start the stack

```bash
docker compose up -d --build
```

The backend container runs `prisma generate`, `prisma db push`, and then starts the API.

### Test with browser and Postman

- Open `http://localhost:5173` to test backend health, database access, and file upload from the web UI
- Import `backend/postman_collection.json`
- Import `backend/postman_environment_local.json`
- Keep `baseUrl` as `http://localhost:5000`
- For the upload request, choose a local file for the `file` field

In the Docker sandbox, upload responses use a `localhost:10000` Azurite URL so the file location is understandable outside the container network.

### Stop the stack

```bash
docker compose down
```

To also remove local Postgres and Azurite data:

```bash
docker compose down -v
```
