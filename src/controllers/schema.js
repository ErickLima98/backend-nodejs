//const res = require('express/lib/response');
const schedule = require('../models/schedule');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

module.exports ={
//consulta a bd
    index: async (req, res) => {
        const allSchedules = await schedule.find({});
        res.status(200).json(allSchedules);
    },

    
    newSchedule: async (req, res) => {
        const newSchedule = new schedule(req.body);
        const sche = await newSchedule.save();
        res.status(200).json(sche);
    },

    //getSchedule by id
    getSchedule: async (req, res, next) => {
        const {scheduleId} = req.params;
        const sche = await schedule.findById(scheduleId);
        res.status(200).json(sche);
    },

    //Put
    ReplaceSchedule: async (req, res, next) => {
        const {scheduleId} = req.params;
        const newSchedule = req.body;
        const oldSchedule = await schedule.findByIdAndUpdate(scheduleId, newSchedule);
        res.status(200).json({sucess: true});
    },

    //Patch
    UpdateSchedule: async (req, res, next) => {
        const {scheduleId} = req.params;
        const newSchedule = req.body;
        const oldSchedule = await schedule.findByIdAndUpdate(scheduleId, newSchedule);
        res.status(200).json({sucess: true});
    },

    DeleteSchedule: async (req, res, next) => {
        const {scheduleId} = req.params;
        await schedule.findByIdAndDelete(scheduleId);
        res.status(200).json({sucess: true});
    },

    getStudentSchedule: async (reg, res, next) => {
        const {scheduleId} = req.params;
        const sche = await schedule.findById(scheduleId);
        res.status(200).json(sche);
    }
}; 