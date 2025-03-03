const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Adminname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        default : "admin"
    },
    AdminType: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

const admin = mongoose.model("admin",adminSchema);
module.exports = admin;