//para manejo de errores
const router =require('express-promise-router')();

const{
    register,
    login,
    validatedUserToken,
    getUser
} = require('../controllers/login')
//getAllSchedules

//NewSchedule

//post user
router.post('/register',register);
//post login
router.post('/login',login);
//get token
router.get('/token', validatedUserToken);
//get user by id
router.get('/:userId', getUser);

module.exports = router;