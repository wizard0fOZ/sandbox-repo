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

## Environment variables

- `PORT`: Backend port. The app listens on `process.env.PORT || 5000`.
- `DATABASE_URL`: Prisma PostgreSQL connection string.
- `JWT_SECRET`: Placeholder for future auth-related sandbox testing.
- `AZURE_STORAGE_CONNECTION_STRING`: Azure Blob Storage connection string.
- `AZURE_STORAGE_CONTAINER_MISSION_PROOFS`: Blob container name for mission proof uploads.
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

## Deploying to Azure App Service

1. Create the required environment variables in Azure App Service.
2. Run Prisma migration against the Azure PostgreSQL database before or during deployment.
3. Make sure the Blob Storage container exists, or let the app create it on first upload.
4. Set `FRONTEND_URL` to your Azure Static Web App URL.
5. Deploy the contents of this `backend` folder to Azure App Service.
