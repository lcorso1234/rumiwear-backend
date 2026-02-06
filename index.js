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

const app = express();
const port = process.env.PORT || 3002;
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

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/blog", blogRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/text", textRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/products", productRoutes);

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
