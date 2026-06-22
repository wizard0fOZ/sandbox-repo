import { useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

const initialRequestState = {
  loading: false,
  error: "",
  data: null,
  status: ""
};

function formatResponseData(data) {
  if (data === null) {
    return "No response yet";
  }

  return JSON.stringify(data, null, 2);
}

function ResponsePanel({ title, state }) {
  return (
    <div className="response-panel">
      <p className="response-title">{title}</p>
      <p>
        <strong>Status:</strong> {state.status || "Not tested yet"}
      </p>
      {state.error ? <p className="error-text">{state.error}</p> : null}
      <pre>{formatResponseData(state.data)}</pre>
    </div>
  );
}

function App() {
  const [healthState, setHealthState] = useState(initialRequestState);
  const [databaseState, setDatabaseState] = useState(initialRequestState);
  const [uploadState, setUploadState] = useState(initialRequestState);
  const [selectedFile, setSelectedFile] = useState(null);

  const runGetRequest = async (path, setState) => {
    if (!apiBaseUrl) {
      setState({
        loading: false,
        error: "VITE_API_BASE_URL is not set.",
        data: null,
        status: "Configuration error"
      });
      return;
    }

    setState({
      loading: true,
      error: "",
      data: null,
      status: "Loading..."
    });

    try {
      const response = await fetch(`${apiBaseUrl}${path}`);
      const data = await response.json();

      setState({
        loading: false,
        error: response.ok ? "" : "Request failed.",
        data,
        status: `${response.status} ${response.statusText}`
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message || "Unexpected error.",
        data: null,
        status: "Network error"
      });
    }
  };

  const handleUpload = async () => {
    if (!apiBaseUrl) {
      setUploadState({
        loading: false,
        error: "VITE_API_BASE_URL is not set.",
        data: null,
        status: "Configuration error"
      });
      return;
    }

    if (!selectedFile) {
      setUploadState({
        loading: false,
        error: "Choose an image file first.",
        data: null,
        status: "Validation error"
      });
      return;
    }

    setUploadState({
      loading: true,
      error: "",
      data: null,
      status: "Uploading..."
    });

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${apiBaseUrl}/uploads/mission-proof`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      setUploadState({
        loading: false,
        error: response.ok ? "" : "Upload failed.",
        data,
        status: `${response.status} ${response.statusText}`
      });
    } catch (error) {
      setUploadState({
        loading: false,
        error: error.message || "Unexpected error.",
        data: null,
        status: "Network error"
      });
    }
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Azure Sandbox Verification</p>
        <h1>SDG Recycling Sandbox Test</h1>
        <p className="hero-copy">
          Use this page to confirm the deployed frontend can reach the backend
          API, test the database connection, and upload a sample mission proof
          image.
        </p>
      </section>

      <section className="card">
        <h2>Environment Display</h2>
        <p>Current backend API base URL:</p>
        <code className="env-pill">{apiBaseUrl || "Not configured"}</code>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h2>Backend Health Test</h2>
            <p>Checks whether the Express backend is reachable.</p>
          </div>
          <button
            type="button"
            onClick={() => runGetRequest("/health", setHealthState)}
            disabled={healthState.loading}
          >
            {healthState.loading ? "Testing..." : "Test Backend Health"}
          </button>
        </div>
        <ResponsePanel title="Health Response" state={healthState} />
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h2>Database Connection Test</h2>
            <p>Verifies Prisma can connect to PostgreSQL.</p>
          </div>
          <button
            type="button"
            onClick={() => runGetRequest("/db-test", setDatabaseState)}
            disabled={databaseState.loading}
          >
            {databaseState.loading ? "Testing..." : "Test Database"}
          </button>
        </div>
        <ResponsePanel title="Database Response" state={databaseState} />
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h2>Image Upload Test</h2>
            <p>Uploads a sample mission proof image to Azure Blob Storage.</p>
          </div>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploadState.loading}
          >
            {uploadState.loading ? "Uploading..." : "Upload Mission Proof"}
          </button>
        </div>

        <label className="file-picker" htmlFor="mission-proof-file">
          <span>Select image file</span>
          <input
            id="mission-proof-file"
            type="file"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
          />
        </label>

        <p className="file-name">
          Selected file: {selectedFile ? selectedFile.name : "No file selected"}
        </p>

        <ResponsePanel title="Upload Response" state={uploadState} />
      </section>
    </main>
  );
}

export default App;
