//const res = require('express/lib/response');
const schedule = require('../models/schedule');
const Student = require('../models/student');
const tutor = require('../models/tutor');

module.exports ={
//consulta a bd
    index: async (req, res, next) => {
        const allTutores = await tutor.find({});
        res.status(200).json(allTutores);
    },

    newTutor: async (req, res, next) => {
        const newTutor = new tutor(req.body);
        const tuto = await newTutor.save();
        res.status(200).json(tuto);
        },

      //getTutor by id
      getTutor: async (req, res, next) => {
        const {tutorId} = req.params;
        const tuto = await tutor.findById(tutorId);
        res.status(200).json({tuto});
    },

    //Put
    ReplaceTutor: async (req, res, next) => {
        const {tutorId} = req.params;
        const newTutor = req.body;
        const oldTutor = await tutor.findByIdAndUpdate(tutorId, newTutor);
        res.status(200).json({sucess: true});
    },

    //Patch
    UpdateTutor: async (req, res, next) => {
        const {tutorId} = req.params;
        const newTutor = req.body;
        const oldTutor = await tutor.findByIdAndUpdate(tutorId, newTutor);
        res.status(200).json({sucess: true});
    },

    DeleteTutor: async (req, res, next) => {
        const {tutorId} = req.params;
        await tutor.findByIdAndDelete(tutorId);
        res.status(200).json({sucess: true});
    },

    getStudentTutor: async (reg, res, next) => {
        const {tutorId} = req.params;
        const tuto = await tutor.findById(tutorId);
        res.status(200).json(tuto);
    },

    getCourse: async (req, res, next) => {
        const allTutores = await tutor.find({});
        for(var t=0; t<allTutores.length; t++){
            for(var c=0; c<allTutores[t].CoursesMaster.length; c++){
    
                if(req.params.nameCourse === allTutores[t].CoursesMaster[c].name){
                
                    res.status(200).json({Curso: allTutores[t].CoursesMaster[c].name, Tutor:allTutores[t].name });
                }
            }
        }
        res.json({menssage: "no se encontro el curso"});
    }
}; 