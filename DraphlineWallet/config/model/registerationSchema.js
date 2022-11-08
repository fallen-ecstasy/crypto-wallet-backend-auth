const mongoose = require('mongoose');

const userRegistrationSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    securityQuestion : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    }
});

const registerSchema = new mongoose.model("registerSchema" , userRegistrationSchema);

module.exports = registerSchema;