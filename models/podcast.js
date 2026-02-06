const mongoose = require("mongoose");

const PodcastSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    metric: { type: String, required: true, trim: true },
    audioUrl: { type: String, trim: true },
    coverImageUrl: { type: String, trim: true },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", PodcastSchema);
