const express = require("express");
const routes = require("./routers");

const app = express();
app.use(express.json());

app.get("/", (_request, response) => {
    response.send({ message: "Welcome to blog Application." });
});

app.use(routes);
module.exports = app;
