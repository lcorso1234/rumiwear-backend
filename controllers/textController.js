const TextBlock = require("../models/textBlock");

exports.list = async (req, res, next) => {
  try {
    const items = await TextBlock.find().sort({ key: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getByKey = async (req, res, next) => {
  try {
    const item = await TextBlock.findOne({ key: req.params.key });
    if (!item) {
      return res.status(404).json({ error: "Text block not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await TextBlock.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.upsertByKey = async (req, res, next) => {
  try {
    const item = await TextBlock.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true, runValidators: true, upsert: true }
    );
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await TextBlock.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Text block not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
