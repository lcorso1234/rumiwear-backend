const express = require("express");
const controller = require("../controllers/quoteController");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", controller.listPublic);
router.post("/", controller.create);
router.get("/admin", controller.listAdmin);
router.get("/admin/:status", controller.getPendingQuotes);

router.patch("/:id/approve", controller.approve);
router.patch("/:id/reject", controller.reject);
router.delete("/:id", controller.remove);

module.exports = router;
