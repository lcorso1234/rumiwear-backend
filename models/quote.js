const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, maxlength: 1000 },
    background: { type: String, default: "#ffffff" },
    textColor: { type: String },
    name: { type: String, trim: true, maxlength: 120 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 40 },
    submissionType: {
      type: String,
      enum: ["quote", "tshirtDropsLead"],
      default: "quote",
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
