const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    guest: { type: String, trim: true },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    gradient: { type: String, trim: true },
    src: { type: String, required: true, trim: true },
    transcript: [{ type: String, trim: true }],
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
