//para manejo de errores
const router =require('express-promise-router')();

const{
    index,
    newStudent,
    getStudent,
    ReplaceStudent,
    DeleteStudent,
    getStudentStudent,
    getStudentParams
} = require('../controllers/studentSchema')
//getAllStudents
router.get('/', index);
//NewStudent
//router.post('/', newStudent)
router.post('/',newStudent);
//putStudent
router.get('/:studentId', getStudentParams);
router.get('/',getStudent);
//updateStudent
router.put('/actualizar/:studentId', ReplaceStudent);
//delete Student
router.delete('/eliminar/:studentId', DeleteStudent);

router.get('/:studentId/tutor',getStudentStudent);

module.exports = router;