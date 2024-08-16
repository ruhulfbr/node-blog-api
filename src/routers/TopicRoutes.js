const express = require("express");
const {TopicController} = require("../controllers");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidateRequest = require("../middlewares/ValidateRequest");
const TopicRequest = require("../validator/topic/TopicRequest");

const router = express.Router();

router.get("/", ValidateToken, TopicController.index);
router.get("/:topicId", ValidateToken, TopicController.show);
router.post(
    "/",
    ValidateToken,
    TopicRequest.createTopic,
    ValidateRequest,
    TopicController.store
);

// router.get("/:topicId/posts", validateToken, TopicController.posts);
router.put(
    "/:topicId",
    ValidateToken,
    TopicRequest.updateTopic,
    ValidateRequest,
    TopicController.update
);
router.delete("/:topicId", ValidateToken, TopicController.destroy);
router.get("/:topicId/posts", ValidateToken, TopicController.posts);

module.exports = router;
