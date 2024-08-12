const express = require("express");
const userRoutes = require("./users.routes");
const loginRoute = require("./login.routes");
const categoryRoutes = require("./categories.routes");
const postRoutes = require("./posts.routes");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/login", loginRoute);
router.use("/categories", categoryRoutes);
router.use("/post", postRoutes);

module.exports = router;
