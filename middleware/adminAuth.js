module.exports = function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(500).json({ error: "ADMIN_API_KEY not set" });
  }

  const headerKey = req.headers["x-admin-key"];
  const authHeader = req.headers.authorization;
  let token = headerKey;

  if (!token && authHeader) {
    token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  }

  if (!token || token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
