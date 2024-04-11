require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const publicRoutes = require("./src/public/routes");
const jwt = require("./src/utils/jwt");
const routes = require("./src/routes/index");
const db = require("./src/utils/db");
const app = express();
const port = process.env.PORT || 3002;
const cors = require("cors");

db.connect();

app.use(morgan("dev"));

app.use(cors("*"));
app.use("/", publicRoutes);
app.use("/api", jwt.verify, routes);

app.get("/", (req, res) => {
    res.send("DB connected and listening");
});

app.use("/", routes);

app.use((resp, req, res, next) => {
    res.status(resp.status).send(resp.send);
});

app.listen(port, () => {
    console.log("Server is listening in port " + port);
});
