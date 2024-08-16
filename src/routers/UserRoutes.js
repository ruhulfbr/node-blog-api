const express = require("express");
const {UserController} = require("../controllers");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidateRequest = require("../middlewares/ValidateRequest");
const UserRequest = require("../validator/user/UserRequest");

const router = express.Router();

router.get("/", ValidateToken, UserController.index);
router.post("/", ValidateToken, UserRequest.createUser, ValidateRequest, UserController.store);
router.get("/:userId", ValidateToken, UserController.show);
router.put("/:userId", ValidateToken, UserRequest.updateUser, ValidateRequest, UserController.update);
router.patch(
    "/:userId/password",
    ValidateToken,
    UserRequest.updateUserPassword,
    ValidateRequest,
    UserController.updatePassword
);
router.patch(
    "/:userId/status",
    ValidateToken,
    UserRequest.updateUserStatus,
    ValidateRequest,
    UserController.updateStatus
);
router.patch(
    "/:userId/role",
    ValidateToken,
    UserRequest.updateUserRole,
    ValidateRequest,
    UserController.updateRole
);
router.delete("/:userId", ValidateToken, UserController.destroy);
router.get("/:userId/posts", ValidateToken, UserController.posts);

module.exports = router;
