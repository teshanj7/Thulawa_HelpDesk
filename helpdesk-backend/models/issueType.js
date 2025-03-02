const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueTypeSchema = new Schema({
    issueTypeName: {
        type: String,
        required: true
    },
    issuePriorityLevel: {
        type: Number,
        required: true
    }
})

const issueType = mongoose.model("issueType",issueTypeSchema);
module.exports = issueType;