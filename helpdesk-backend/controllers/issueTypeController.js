let IssueType = require('../models/issueType');
let Issue = require('../models/issue');

const createIssueType = async (req, res) => {
    const { issueTypeName, issuePriorityLevel } = req.body;

    const newIssueType = new IssueType({
        issueTypeName,
        issuePriorityLevel
    })

    if (!issueTypeName || !issuePriorityLevel) {
        return res.status(400).json({ message: 'These fields are required!' })
    }

    newIssueType.save().then(() => {
        res.json("Issue type created successfully")
    }).catch((err) => {
        console.log(err);
    })

};

//view all issue types
const getAllIssueTypes = async (req, res) => {
    try {
        const issueTypes = await IssueType.find();
        res.json(issueTypes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//update an issue type by id
const updateIssueType = async (req, res) => {
    const id = req.params.id;
    const { issueTypeName, issuePriorityLevel } = req.body;

    if (!issueTypeName || !issuePriorityLevel) {
        return res.status(400).json({ message: 'These fields are required!' })
    }

    IssueType.findByIdAndUpdate(id, { issueTypeName, issuePriorityLevel }, { new: true }).then(() => {
        res.json("Issue type updated successfully")
    }).catch((err) => {
        console.log(err);
    })
};

//delete an issue type by id
const deleteIssueType = async (req, res) => {
    const id = req.params.id;

    IssueType.findByIdAndDelete(id).then(() => {
        res.json("Issue type deleted successfully")
    }).catch((err) => {
        console.log(err);
    })
};

const updateIssueTypePriority = async (req, res) => {
    const { newPriorityLevel } = req.body;  
    const  issueTypeId  = req.params.id;

    try {
        // Find the issueType by its ID
        const issueType = await IssueType.findById(issueTypeId);

        if (!issueType) {
            return res.status(404).json({ message: 'IssueType not found!' });
        }

        // Update the priority level of the issueType
        issueType.issuePriorityLevel = newPriorityLevel;
        await issueType.save();

        // Update all issues with the matching issueTypeId to match the new priority level
        await Issue.updateMany(
            { issueType: issueType.issueTypeName }, 
            { $set: { issuePriority: newPriorityLevel } } 
        );

        res.json({ message: 'IssueType priority updated and issues updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating issueType priority and issues' });
    }
};

module.exports = { createIssueType, getAllIssueTypes, updateIssueType, deleteIssueType, updateIssueTypePriority };