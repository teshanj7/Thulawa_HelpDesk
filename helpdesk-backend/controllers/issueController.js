let Issue = require('../Models/issue');

const createIssue = async (req, res) => {
    const { UserId, studentName, studentEmail, studentRegistrationNo, studentFaculty, studentCampus, 
        studentContactNo, issueType, issueMessage, issueAttachment, issueStatus, issueResolvedBy, issueCreatedDate, issueResolvedDate, issueResolvedMessage, issuePriority } = req.body;

    const newIssue = new Issue({
        UserId,
        studentName,
        studentEmail,
        studentRegistrationNo,
        studentFaculty,
        studentCampus,
        studentContactNo,
        issueType,
        issueMessage,
        issueAttachment,
        issueStatus,
        issueResolvedBy,
        issueCreatedDate,   
        issueResolvedDate,
        issueResolvedMessage,
        issuePriority
    })

    if (!studentName || !studentEmail || !studentRegistrationNo || !studentFaculty || !studentCampus || !studentContactNo || !issueType || !issueMessage) {
        return res.status(400).json({ message: 'These fields are required!' })
    }

    newIssue.save().then(() => {
        res.json("Issue created successfully")
    }).catch((err) => {
        console.log(err);
    })

};

//view all issues by userId
const getAllIssuesByUserId = async (req, res) => {
    const UserId = req.params.id;

    try {
        const issues = await Issue.find({ UserId: UserId });
        res.json(issues);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//view all issues
const getAllIssues = async (req, res) => {
    try{
        const issues = await Issue.find();
        res.json(issues);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
}

//update an issue by id
const updateIssue = async (req, res) => {
    let issueId = req.params.id;
    const { studentName, studentEmail, studentRegistrationNo, studentFaculty, studentCampus, studentContactNo, issueType, issueMessage, issueAttachment, issueStatus, issueResolvedBy, issueResolvedDate, issueResolvedMessage } = req.body;

    const updateIssue = {
        studentName,
        studentEmail,
        studentRegistrationNo,
        studentFaculty,
        studentCampus,
        studentContactNo,
        issueType,
        issueMessage,
        issueAttachment,
        issueStatus,
        issueResolvedBy,
        issueResolvedDate,
        issueResolvedMessage
    }

    Issue.findByIdAndUpdate(issueId, updateIssue).then(() => {
        res.json("Issue updated successfully")
    }).catch((err) => {
        console.log(err);
    })
}

//delete issue by id
const deleteIssue = async (req, res) => {

    let issueId = req.params.id;

    Issue.findByIdAndDelete(issueId).then(() => {
        res.json("Issue deleted successfully");
    }).catch((err) => {
        console.log(err);
    })
}

//search issue
const searchIssue = async (req, res) => {
    let result = await Issue.find({
        "$or": [
            { studentName: { $regex: req.params.key } },
            { studentRegistrationNo: { $regex: req.params.key } },
            { issueResolvedBy: { $regex: req.params.key } }
        ]
    });
    res.send(result);
}

//update issue status by id
const updateIssueStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { issueStatus } = req.body;

        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            { issueStatus },
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json({ message: 'Issue status updated successfully', updatedIssue });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//resolve issue by id
const resolveIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const { issueStatus, issueResolvedBy, issueResolvedMessage } = req.body;
        const issueResolvedDate = new Date();

        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            { issueStatus, issueResolvedBy, issueResolvedMessage, issueResolvedDate },
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json({ message: 'Issue resolved successfully', updatedIssue });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

//update issue priority by id
const updateIssuePriority = async (req, res) => {
    try {
        const { id } = req.params;
        const { issuePriority } = req.body;

        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            { issuePriority },
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(200).json({ message: 'Issue priority updated successfully', updatedIssue });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createIssue, getAllIssuesByUserId, getAllIssues, updateIssue, deleteIssue, searchIssue, updateIssueStatus, resolveIssue, updateIssuePriority };