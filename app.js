const bodyparcer = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //It's helps to read enviroment variables of the api

const app = express();

var whitelist = ['https://teayudo-online.netlify.app', 'http://localhost:8080']

var corsOptions = function(req, callback){
    var corsopt;
    if(whitelist.indexOf(req.header('origin'))!== -1){
        corsopt = {origin: true}
    }
    else{
        corsopt = {origin: false}
    }
    callback(null, corsopt)
    // origin: "*", //dominio 
    // optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', cors(corsOptions), function (req, res, next){
    res.json({output: 'Cors, enable on whitelist'})
})

app.listen(8080, function(){
    console.log('CORS-enable on port 8080')
})

app.use(bodyparcer.urlencoded({extended: false}));
app.use(bodyparcer.json());

//import routes
const scheduleRoutes = require('./src/routes/schedule');
const tutorRoutes = require('./src/routes/tutor');
const studentRoutes = require('./src/routes/student');
const loginRoutes = require('./src/routes/login');
const vToken =  require('./src/Middlewares/ValidateToken');
const user = require('./src/routes/user');

//BD Connection
const uri = `mongodb+srv://admin1:admin123@clusterayudo.z3bhe.mongodb.net/?retryWrites=true&w=majority`;
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(uri, options).then(() => console.log('DB connected')).catch(e => console.log('DB error', e))
//pet
app.use(morgan('dev'));
app.use(bodyparcer.json());

//routes
app.use('/schedule', scheduleRoutes)
app.use('/tutor', tutorRoutes)
app.use('/student', studentRoutes)
app.use('/user', loginRoutes)
app.use('/admin', vToken, user) //first we validate token with my middlewares, then enter to user

//start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () =>{
    console.log('Server TeAyudo on port', app.get('port'));
});

