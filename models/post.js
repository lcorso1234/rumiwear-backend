const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    readTime: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
      // Full blog post body (Markdown or HTML)
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

module.exports = mongoose.model("Post", PostSchema);
