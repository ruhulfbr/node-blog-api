const express = require("express");
const { topicController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/", validateToken, topicController.create);
router.get("/", validateToken, topicController.getAll);

module.exports = router;
