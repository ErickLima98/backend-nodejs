const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema;

const student = new StudentSchema({
    "studentId":String,
    "currentGrade": String,
    "phone": String
});

module.exports = mongoose.model('Student', student)