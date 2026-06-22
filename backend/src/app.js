import "dotenv/config";
import cors from "cors";
import express from "express";
import { buildCorsOptions } from "./config/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apiRoutes from "./routes/api.js";

const app = express();

app.use(cors(buildCorsOptions()));
app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "SDG Recycling Sandbox backend API"
  });
});

app.use("/api/v1", apiRoutes);
app.use(errorHandler);

export default app;
