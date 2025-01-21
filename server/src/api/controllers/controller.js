const fs = require('fs');
const path = require('path');

const normalizeString = (str) => {
    return str.replace(/[^\w\s]/g, ' ').trim().toLowerCase();
};
const getStudentData = () => {
    try {
        const dataPath = path.join(__dirname, '../../models', 'student_data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading student data:', error);
        return [];
    }
};

const searchStudent = async (req, res) => {
    let searchQuery = normalizeString(req.query.search);
    if (searchQuery === "") return res.status(400).json({ status: "error", message: "Search query is required`" });
    const students = getStudentData();
    let filterStudent = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery)
    ).slice(0, 5);
    return res.status(200).json({ status: "sucess", data: filterStudent });
}
module.exports = {
    searchStudent,
};