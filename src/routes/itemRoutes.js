const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

router.get("/", itemController.list);
router.post("/", itemController.create);
router.get("/:id", itemController.get);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.remove);

module.exports = router;
