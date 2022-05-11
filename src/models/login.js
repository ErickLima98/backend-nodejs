const date = require('@hapi/joi/lib/types/date');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const login = new schema({
    "name": String,
    "email":String,
    "password":String,
    "isStudent": false,
    "isTutor": false,
    "date": { type: Date, default: Date.now }
});

module.exports = mongoose.model('Register', login)
 