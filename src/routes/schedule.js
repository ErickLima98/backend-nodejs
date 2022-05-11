//para manejo de errores
const router =require('express-promise-router')();

const{
    index,
    newSchedule,
    getSchedule,
    ReplaceSchedule,
    DeleteSchedule,
    getStudentSchedule
} = require('../controllers/schema')
//getAllSchedules
router.get('/', index);
//NewSchedule
router.post('/', newSchedule)
//putSchedule
router.post('/',newSchedule);
router.get('/:scheduleId', getSchedule);
//updateSchedule
router.put('/:scheduleId', ReplaceSchedule);
//delete Schedule
router.delete('/:scheduleId', DeleteSchedule);
router.get('/:scheduleId/tutor',getStudentSchedule);
module.exports = router;