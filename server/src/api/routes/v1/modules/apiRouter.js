const express = require("express");
const api = express.Router();
const asyncWrapper = require("../../../middlewares/asyncWrapper.js");
const validationMiddleware = require("../../../middlewares/validationMiddleware.js");
const { searchStudent, getStudent } = require("../../../controllers/controller.js");

api.route("/searchStudents").get(validationMiddleware("searchStudent"), asyncWrapper(searchStudent));
api.route("/student").get(validationMiddleware("getStudent"), asyncWrapper(getStudent));

module.exports = { api };   