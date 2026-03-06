const express = require("express");
const controller = require("../controllers/quoteController");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", controller.listPublic);
router.post("/", controller.create);
router.get("/admin", controller.listAdmin);
router.get("/admin/:status", controller.getPendingQuotes);

router.patch("/:id/approve", controller.approve);
router.post("/:id/approve", controller.approve);
router.patch("/:id/reject", controller.reject);
router.post("/:id/reject", controller.reject);
router.delete("/:id", controller.remove);

// Frontend compatibility aliases for older/admin-prefixed moderation paths.
router.patch("/admin/:id/approve", controller.approve);
router.post("/admin/:id/approve", controller.approve);
router.patch("/admin/:id/reject", controller.reject);
router.post("/admin/:id/reject", controller.reject);
router.delete("/admin/:id", controller.remove);

module.exports = router;
