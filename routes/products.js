const express = require("express");
const controller = require("../controllers/productController");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", requireAdmin, controller.create);
router.put("/:id", requireAdmin, controller.update);
router.delete("/:id", requireAdmin, controller.remove);

module.exports = router;
