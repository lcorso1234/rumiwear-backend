module.exports = function requireAdmin(req, res, next) {
  const expected = String(process.env.ADMIN_API_KEY || "").trim();
  if (!expected) {
    return res.status(500).json({ error: "ADMIN_API_KEY not set" });
  }

  const headerKey = req.headers["x-admin-key"] || req.headers["x-api-key"];
  const authHeader = req.headers.authorization;
  let token = headerKey ? String(headerKey).trim() : "";

  if (!token && authHeader) {
    const authValue = String(authHeader).trim();
    token = authValue.toLowerCase().startsWith("bearer ")
      ? authValue.slice(7).trim()
      : authValue;
  }

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
