const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    RegistrationNo: {
        type: String,
        required: true,
    },
    Faculty: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        default: "student"
    },
    StudentType: {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const student = mongoose.model("student", studentSchema);
module.exports = student;
