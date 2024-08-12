const express = require("express");
const routes = require("./routers");

const app = express();
app.use(express.json());

app.get("/", (_request, response) => {
    response.send({ message: "Bangladesh is out homeland." });
});

app.use(routes);
module.exports = app;
