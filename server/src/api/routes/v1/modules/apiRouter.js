const express = require("express");
const api = express.Router();
const asyncWrapper = require("../../../middlewares/asyncWrapper.js");
const validationMiddleware = require("../../../middlewares/validationMiddleware.js");

const { searchStudent } = require("../../../controllers/controller.js");


api.route("/searchStudent").get(validationMiddleware("searchStudent"), asyncWrapper(searchStudent));

module.exports = { api };