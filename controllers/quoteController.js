const Quote = require("../models/quote");

const MAX_TEXT_LENGTH = 1000;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 40;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.listPublic = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "0", 10) || 0, 200);
    const query = Quote.find({
      status: "approved",
      submissionType: { $ne: "tshirtDropsLead" },
    }).sort({ createdAt: -1 });
    if (limit) query.limit(limit);
    const items = await query;
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.listAdmin = async (req, res, next) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    const items = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getPendingQuotes = async (req, res, next) => {
  try {
    const status = req.params.status;
    const filter = status ? { status } : {};
    const items = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const name = normalizeString(req.body.name);
    const email = normalizeString(req.body.email).toLowerCase();
    const phone = normalizeString(req.body.phone);
    const submissionType = normalizeString(req.body.submissionType);

    const hasLeadFields = Boolean(name || email || phone);
    const isTshirtDropsLead = submissionType === "tshirtDropsLead" || hasLeadFields;
    let text = normalizeString(req.body.text);

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return res.status(400).json({ error: "Name too long" });
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ error: "Email too long" });
    }
    if (phone.length > MAX_PHONE_LENGTH) {
      return res.status(400).json({ error: "Phone too long" });
    }

    if (!text) {
      if (isTshirtDropsLead) {
        const leadLabel = name || email || phone;
        text = leadLabel ? `T-shirt drops lead from ${leadLabel}` : "T-shirt drops lead";
      } else {
        return res.status(400).json({ error: "Quote text is required" });
      }
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return res.status(400).json({ error: "Quote text too long" });
    }

    const item = await Quote.create({
      text,
      background: req.body.background || "#ffffff",
      textColor: req.body.textColor,
      name: name || undefined,
      email: email || undefined,
      phone: phone || undefined,
      submissionType: isTshirtDropsLead ? "tshirtDropsLead" : "quote",
      status: "pending",
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.approve = async (req, res, next) => {
  try {
    const item = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: "approved", approvedAt: new Date() },
      { new: true },
    );
    if (!item) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.reject = async (req, res, next) => {
  try {
    const item = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );
    if (!item) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Quote.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
