const express = require("express");
const config = require("./configs/index.js");

const app = express();
require("./loaders/index.js")(app);

app.listen(config.port, () => {
    console.log("Server running on " + config.port);
});