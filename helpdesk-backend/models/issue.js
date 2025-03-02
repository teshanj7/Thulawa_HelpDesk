const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    UserId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentRegistrationNo: {
        type: String,
        required: true
    },
    studentFaculty: {
        type: String,
        required: true
    },
    studentCampus: {
        type: String,
        required: true
    },
    studentContactNo: {
        type: String,
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    issueMessage: {
        type: String,
        required: true
    },
    issueAttachment: {
        type: String,
        required: false
    },
    issueStatus: {
        type: String,
        default: "pending"
    },
    issueResolvedBy: {
        type: String,
        required: false
    },
    issueCreatedDate: {
        type: Date,
        default: Date.now
    },
    issueResolvedDate: {
        type: Date,
        required: false
    },
    issueResolvedMessage: {
        type: String,
        required: false
    },
    issuePriority: {
        type: Number,
        required: false
    }
})

const issue = mongoose.model("issue",issueSchema);
module.exports = issue;