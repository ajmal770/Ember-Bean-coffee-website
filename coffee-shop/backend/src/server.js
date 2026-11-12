import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Premium Coffee Shop & Restaurant API",
    version: "1.0.0",
    uptime: Math.floor(process.processUptime ? process.processUptime() : process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/menu", menuRoutes);
app.use("/api/contact", contactRoutes);

// Root fallback
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Premium Coffee Shop & Restaurant API",
    endpoints: {
      health: "/api/health",
      menu: "/api/menu",
      menuByCategory: "/api/menu/:category",
      contact: "POST /api/contact"
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found on endpoint: ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error occurred",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`☕ Premium Coffee Shop API running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

export default app;

