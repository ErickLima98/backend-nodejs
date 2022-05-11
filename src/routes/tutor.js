//para manejo de errores
const router =require('express-promise-router')();

const{
    index,
    newTutor,
    getTutor,
    ReplaceTutor,
    DeleteTutor,
    getStudentTutor,
    getCourse
} = require('../controllers/tutor')
//getAllTutor
router.get('/', index);
//NewTutor
router.post('/',newTutor);
router.get('/:tutorId', getTutor);
//updateTutor
router.put('/:tutorId', ReplaceTutor);
//delete Tutor
router.delete('/:tutorId', DeleteTutor);

router.get('/:tutorId/tutor',getStudentTutor);

router.get('/course/:nameCourse',getCourse);

module.exports = router;