const express = require("express");
const userRoutes = require("./UserRoutes");
// const loginRoute = require("./login.routes");
const topicRoutes = require("./TopicRoutes");
// const postRoutes = require("./posts.routes");

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/login", loginRoute);
router.use("/topics", topicRoutes);
// router.use("/post", postRoutes);

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
    });
});

router.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found",
        message: "The requested resource could not be found.",
    });
});

module.exports = router;
