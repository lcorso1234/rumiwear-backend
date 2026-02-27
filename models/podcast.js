const mongoose = require("mongoose");
const { PODCAST_CATEGORY_VALUES } = require("../utils/podcastOptions");

const PodcastSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: PODCAST_CATEGORY_VALUES,
    },
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
