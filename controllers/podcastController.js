const Podcast = require("../models/podcast");

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

exports.create = async (req, res, next) => {
  try {
    const item = await Podcast.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Podcast.findByIdAndUpdate(req.params.id, req.body, {
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
