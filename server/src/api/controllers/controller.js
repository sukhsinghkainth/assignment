const dbService = require("../services/dbServices")

const normalizeString = (str) => {
    return str.replace(/[^\w\s]/g, ' ').trim().toLowerCase();
};
const getStudent = async (req, res) => {
    let { rollNumber } = req.query;
    if (typeof rollNumber === "string") rollNumber = parseInt(rollNumber)
    const student = dbService.findOne('students', { where: { rollNumber } })
    return res.status(200).json({ status: "sucess", data: student });
};

const searchStudent = async (req, res) => {
    let { limit, offset, search } = req.query;
    let searchQuery = normalizeString(search);
    const students = dbService.findAll("students", {
        where: { name: { $like: searchQuery } },
        attributes: ["name", "rollNumber"],
        limit: limit,
        offset: offset
    })
    return res.status(200).json({ status: "sucess", data: students });
}
module.exports = {
    searchStudent,
    getStudent
};