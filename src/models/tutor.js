const mongoose = require('mongoose');
const TutorSchema = mongoose.Schema;

const tutor = new TutorSchema({
    "tutorId" : String,
    "name": String,
    "lastName": String,
    "description": String,
    "academicDegree":String,
    "CoursesMaster":[],
    "email":String,
    "password": String,
    "phone":String,
    
});

module.exports = mongoose.model('tutor', tutor)