const express = require("express");
const { postController } = require("../controllers");
const {
    validateToken,
    validateTokenId,
    validateCategories,
} = require("../middlewares");

const router = express.Router();

router.get("/", validateToken, postController.getAll);
router.get("/:id", validateToken, postController.getById);
router.put("/:id", validateToken, validateTokenId, postController.update);
router.post("/", validateToken, validateCategories, postController.create);
router.delete("/:id", validateToken, postController.remove);

module.exports = router;
