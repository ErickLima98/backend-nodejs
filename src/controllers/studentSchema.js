//const res = require('express/lib/response');
const schedule = require('../models/schedule');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

module.exports ={
//consulta a bd
    index: async (req, res, next) => {
        const allStudents = await Student.find({});
        res.status(200).json(allStudents);
    },

    newStudent: async (req, res, next) => {
        const newStudent = new Student(req.body);
        const stud = await newStudent.save();
        res.status(200).json(stud);
    },
    //getStudent by id
    getStudentParams: async (req, res, next) => {
        const {studentId} = req.params;
        const stud = await Student.findById(studentId);
        res.status(200).json({stud});
    },
    getStudent: async (req, res, next) => {
        const stud = await Student.find();
        res.status(200).json({stud});
    },
    //Put
    ReplaceStudent: async (req, res, next) => {
        const {studentId} = req.params;
        const newStudent = req.body;
        const oldStudent = await Student.findByIdAndUpdate(studentId, newStudent);
        res.status(200).json({sucess: true});
    },

    //Patch
    UpdateStudent: async (req, res, next) => {
        const {studentId} = req.params;
        const newStudent = req.body;
        const oldStudent = await Student.findByIdAndUpdate(studentId, newStudent);
        res.status(200).json({sucess: true});
    },

    DeleteStudent: async (req, res, next) => {
        const {studentId} = req.params;
        await Student.findByIdAndDelete(studentId);
        res.status(200).json({sucess: true});
    },

    getStudentStudent: async (reg, res, next) => {
        const {studentId} = req.params;
        const stud = await Student.findById(studentId);
        res.status(200).json(stud);
    }
}; 