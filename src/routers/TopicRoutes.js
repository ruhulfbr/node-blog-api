// const express = require("express");
// const { topicController } = require("../controllers");
// const validateToken = require("../middlewares/validateToken");

// const router = express.Router();

// router.post("/", validateToken, topicController.create);
// router.get("/", validateToken, topicController.getAll);

// module.exports = router;

const express = require("express");
const { TopicController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");
const validateRequest = require("../middlewares/validateRequest");
const validateCreateRequest = require("../validator/topic/CreateTopic");
const validateUpdateRequest = require("../validator/topic/UpdateTopic");

const router = express.Router();

router.get("/", validateToken, TopicController.index);
router.get("/:topicId", validateToken, TopicController.show);
router.post(
    "/",
    validateToken,
    validateCreateRequest,
    validateRequest,
    TopicController.store
);
// router.get("/:topicId/posts", validateToken, TopicController.posts);
router.put(
    "/:topicId",
    validateToken,
    validateUpdateRequest,
    validateRequest,
    TopicController.update
);
// router.delete(":topicId", validateToken, TopicController.destroy);

module.exports = router;
