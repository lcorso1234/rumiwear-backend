const Podcast = require("../models/podcast");
const { PODCAST_CATEGORY_OPTIONS } = require("../utils/podcastOptions");

const ALLOWED_FIELDS = [
  "label",
  "title",
  "description",
  "metric",
  "audioUrl",
  "coverImageUrl",
  "publishedAt",
];

function pickAllowedFields(input) {
  const output = {};
  for (const field of ALLOWED_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(input, field)) {
      output[field] = input[field];
    }
  }
  return output;
}

exports.list = async (req, res, next) => {
  try {
    const items = await Podcast.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await Podcast.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Podcast not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.categories = (req, res) => {
  res.json({ categories: PODCAST_CATEGORY_OPTIONS });
};

exports.create = async (req, res, next) => {
  try {
    const payload = pickAllowedFields(req.body || {});
    const item = await Podcast.create(payload);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const payload = pickAllowedFields(req.body || {});
    const item = await Podcast.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ error: "Podcast not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Podcast.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Podcast not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
