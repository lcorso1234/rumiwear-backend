const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    price: { type: String, required: true, trim: true },
    front: { type: String, required: true, trim: true },
    back: { type: String, required: true, trim: true },
    badge: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
