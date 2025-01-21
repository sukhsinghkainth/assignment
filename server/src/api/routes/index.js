const express = require("express");
const router = express.Router();

const config = require("../../configs/index"); // Import config
const { api } = require("./v1/modules/apiRouter.js"); // Import v1 routes

// Register versioned routes
router.use(`/${config.apiVersions[0]}/`, api);


// handle 404 error
router.use((req, res, next) => {
    const error = new Error(`API route not found: [${req.method}] ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// **** If need the more version ****
// if (config.apiVersions[1]) {
//     const usersV2 = require("./v2/modules/users"); // Import v2 routes
//     router.use(/${config.apiPrefix}/${config.apiVersions[1]}, usersV2);
// }

module.exports = router;