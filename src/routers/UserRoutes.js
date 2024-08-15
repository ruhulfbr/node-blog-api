const express = require("express");
const { UserController } = require("../controllers");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidateRequest = require("../middlewares/ValidateRequest");

const router = express.Router();

router.get("/", ValidateToken, UserController.index);
router.post("/", ValidateToken, ValidateRequest, UserController.store);
router.get("/:userId", ValidateToken, UserController.show);
router.put("/:userId", ValidateToken, ValidateRequest, UserController.update);
router.patch(
    "/:userId/password",
    ValidateToken,
    ValidateRequest,
    UserController.updatePassword
);
router.patch(
    "/:userId/status",
    ValidateToken,
    ValidateRequest,
    UserController.updateStatus
);
router.patch(
    "/:userId/role",
    ValidateToken,
    ValidateRequest,
    UserController.updateRole
);
router.delete("/:userId", ValidateToken, UserController.destroy);
router.get("/:userId/posts", ValidateToken, UserController.posts);

module.exports = router;
