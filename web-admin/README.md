# SDG Recycling Sandbox Frontend

This is a minimal Vite + React frontend for verifying that the Azure Static Web App can talk to the sandbox backend deployed on Azure App Service.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

PowerShell alternative:

```powershell
Copy-Item .env.example .env
```

3. Set `VITE_API_BASE_URL` to your backend API base URL, for example:

```env
VITE_API_BASE_URL=https://your-backend-app.azurewebsites.net/api/v1
```

For the repo-level Docker sandbox, `web-admin/.env.docker` already points to `http://localhost:5000/api/v1`.

## Run locally

```bash
npm run dev
```

The Vite development server runs on `http://localhost:5173` by default.

## Docker sandbox flow

From the repository root:

```bash
docker compose up -d --build
```

Then open `http://localhost:5173`.

This frontend is intended to verify:

- backend health
- database connectivity
- mission proof upload

## Build

```bash
npm run build
```

Vite outputs the production build to the `dist` folder, which is the expected artifact folder for Azure Static Web Apps in this sandbox setup.

## Azure Static Web Apps notes

- App location: `web-admin`
- Output location: `dist`
- Environment variable to configure: `VITE_API_BASE_URL`

Set `VITE_API_BASE_URL` in Azure Static Web Apps application settings so the deployed frontend points to the deployed backend.
