const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const blogRoutes = require("./routes/blog");
const podcastRoutes = require("./routes/podcasts");
const videoRoutes = require("./routes/videos");
const textRoutes = require("./routes/text");
const uploadRoutes = require("./routes/uploads");
const productRoutes = require("./routes/products");
const quoteRoutes = require("./routes/quotes");

const app = express();
const port = process.env.PORT || 3003;
const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rumiwear";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const defaultAllowedOrigins = [
  "https://rumiwear.net",
  "https://www.rumiwear.net",
  "http://localhost:3000",
  "http://localhost:3001",
];

const envAllowedOrigins = String(process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const envAllowedOriginSuffixes = String(
  process.env.CORS_ALLOWED_ORIGIN_SUFFIXES || "",
)
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean)
  .map((suffix) => (suffix.startsWith(".") ? suffix : `.${suffix}`));

const allowedOriginSuffixes = Array.from(
  new Set([".vercel.app", ...envAllowedOriginSuffixes]),
);

const normalizeOrigin = (value) =>
  String(value || "")
    .trim()
    .replace(/\/$/, "");

const allowedOrigins = Array.from(
  new Set([...defaultAllowedOrigins, ...envAllowedOrigins]),
).map(normalizeOrigin);

const isAllowedOrigin = (origin) => {
  const normalizedOrigin = normalizeOrigin(origin);
  if (!normalizedOrigin) return true;

  if (allowedOrigins.includes(normalizedOrigin)) return true;

  let host;
  try {
    host = new URL(normalizedOrigin).hostname;
  } catch (err) {
    return false;
  }

  return allowedOriginSuffixes.some((suffix) => host.endsWith(suffix));
};

console.log(
  "[cors] allowed origins:",
  allowedOrigins.join(", "),
  "| suffixes:",
  allowedOriginSuffixes.join(", "),
);

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server requests (no Origin header) + tools like curl/postman
    if (isAllowedOrigin(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-admin-key",
    "x-api-key",
    "x-admin-token",
  ],
  optionsSuccessStatus: 204,
};
app.options(/.*/, cors(corsOptions));

// handle preflight
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).send("OK - rumiwear backend running");
});

app.use("/api/blog", blogRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/text", textRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
