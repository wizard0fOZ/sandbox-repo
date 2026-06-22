const defaultOrigins = ["http://localhost:5173"];

export function buildCorsOptions() {
  const allowedOrigins = [...defaultOrigins];

  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS."));
    }
  };
}
