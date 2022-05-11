const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schedule = new schema({
    "idTutor": String,
    "idStudent":String,
    "description":String,
    "state": Boolean,
    "isCanceled": Boolean,
    "isReschedule": Boolean,
    "dateTime":String,
    "course": String,
    "wasRecibed": Boolean,
    "wasTaught": Boolean
});

module.exports = mongoose.model('Schedule', schedule)
 