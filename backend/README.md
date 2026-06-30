# SDG Recycling Sandbox Backend

This is a minimal Express + Prisma backend for validating Azure App Service, PostgreSQL Flexible Server, and Azure Blob Storage integration in a student FYP sandbox environment.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

PowerShell alternative:

```powershell
Copy-Item .env.example .env
```

3. Fill in the environment variables in `.env`.

For the repo-level Docker sandbox, `backend/.env.docker` is already prepared for Compose.

## Environment variables

- `PORT`: Backend port. The app listens on `process.env.PORT || 5000`.
- `DATABASE_URL`: Prisma PostgreSQL connection string.
- `JWT_SECRET`: Placeholder for future auth-related sandbox testing.
- `AZURE_STORAGE_CONNECTION_STRING`: Azure Blob Storage connection string.
- `AZURE_STORAGE_CONTAINER_MISSION_PROOFS`: Blob container name for mission proof uploads.
- `AZURE_STORAGE_BLOB_BASE_URL`: Optional override for returned blob URLs during local Docker testing.
- `FRONTEND_URL`: Deployed Azure Static Web App URL allowed by CORS.

## Run locally

Start the development server:

```bash
npm run dev
```

Start in normal mode:

```bash
npm start
```

## Docker sandbox flow

From the repository root:

```bash
docker compose up -d --build
```

This starts:

- backend on `http://localhost:5000`
- PostgreSQL on `localhost:5432`
- Azurite on `localhost:10000`
- `web-admin` on `http://localhost:5173`

The backend container automatically runs `prisma generate` and `prisma db push` before starting.
Azurite is started with `--skipApiVersionCheck` so local uploads remain compatible with the current Azure Blob SDK used by the backend.

## Prisma workflow

Generate the Prisma client:

```bash
npm run prisma:generate
```

Run a local development migration:

```bash
npm run prisma:migrate -- --name init
```

Seed the database:

```bash
npm run prisma:seed
```

## Postman endpoint tests

- `GET http://localhost:5000/api/v1/health`
- `GET http://localhost:5000/api/v1/db-test`
- `POST http://localhost:5000/api/v1/uploads/mission-proof`

For the upload request, use `form-data` and send the file under the field name `file`.

## Shared Postman files

This folder includes beginner-friendly Postman files that can be shared with teammates:

- `postman_collection.json`
- `postman_environment_local.json`
- `postman_environment_shared.json`

### How to use them

1. Open Postman and import `postman_collection.json`.
2. Import either the local or shared environment file.
3. Select the environment in Postman.
4. Start the backend and run the requests one by one.

### Notes

- The local environment defaults to `http://localhost:5000`.
- The upload endpoint expects `multipart/form-data` with the file field named `file`.
- In the Docker sandbox, uploads are stored in local Azurite and the response URL points to `localhost:10000`.
- The shared environment is a template. Replace the placeholder `baseUrl` with your deployed backend URL before sharing it with others.

## Deploying to Azure App Service

1. Create the required environment variables in Azure App Service.
2. Run Prisma migration against the Azure PostgreSQL database before or during deployment.
3. Make sure the Blob Storage container exists, or let the app create it on first upload.
4. Set `FRONTEND_URL` to your Azure Static Web App URL.
5. Deploy the contents of this `backend` folder to Azure App Service.
