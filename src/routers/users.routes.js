const express = require("express");
const { userController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.post("/", userController.create);
router.get("/", validateToken, userController.getAll);
router.get("/:id", validateToken, userController.getById);
router.delete("/me", validateToken, userController.remove);

module.exports = router;
