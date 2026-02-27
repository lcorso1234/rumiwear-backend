const DEFAULT_PODCAST_CATEGORIES = Object.freeze([
  "featured",
  "tech",
  "business",
  "music",
  "wellness",
  "culture",
  "education",
  "news",
  "community",
]);

function toSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLabel(value) {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseConfiguredCategories(rawValue) {
  if (!rawValue) {
    return DEFAULT_PODCAST_CATEGORIES;
  }

  const seen = new Set();
  const configured = String(rawValue)
    .split(",")
    .map((value) => toSlug(value))
    .filter((value) => value && !seen.has(value) && seen.add(value));

  return configured.length ? configured : DEFAULT_PODCAST_CATEGORIES;
}

const PODCAST_CATEGORY_VALUES = Object.freeze(
  parseConfiguredCategories(process.env.PODCAST_CATEGORIES),
);

const PODCAST_CATEGORY_OPTIONS = Object.freeze(
  PODCAST_CATEGORY_VALUES.map((value) => ({
    value,
    label: toLabel(value),
  })),
);

module.exports = {
  PODCAST_CATEGORY_OPTIONS,
  PODCAST_CATEGORY_VALUES,
};
