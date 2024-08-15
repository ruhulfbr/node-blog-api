const express = require("express");
const { TopicController } = require("../controllers");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidateRequest = require("../middlewares/ValidateRequest");
const CreateTopic = require("../validator/topic/CreateTopic");
const UpdateTopic = require("../validator/topic/UpdateTopic");

const router = express.Router();

router.get("/", ValidateToken, TopicController.index);
router.get("/:topicId", ValidateToken, TopicController.show);
router.post(
    "/",
    ValidateToken,
    CreateTopic,
    ValidateRequest,
    TopicController.store
);

// router.get("/:topicId/posts", validateToken, TopicController.posts);
router.put(
    "/:topicId",
    ValidateToken,
    UpdateTopic,
    ValidateRequest,
    TopicController.update
);
router.delete("/:topicId", ValidateToken, TopicController.destroy);

module.exports = router;
