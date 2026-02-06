const express = require("express");
const controller = require("../controllers/textController");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", controller.list);
router.get("/key/:key", controller.getByKey);
router.post("/", requireAdmin, controller.create);
router.put("/key/:key", requireAdmin, controller.upsertByKey);
router.delete("/:id", requireAdmin, controller.remove);

module.exports = router;
