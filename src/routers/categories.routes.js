const express = require("express");
const { categoryController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/", validateToken, categoryController.create);
router.get("/", validateToken, categoryController.getAll);

module.exports = router;
