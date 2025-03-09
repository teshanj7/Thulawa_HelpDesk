let Issue = require('../models/issue');
const { producer } = require('../kafka/kafkaConfig');

// create issue
const createIssue = async (req, res) => {
    const { UserId, studentName, studentEmail, studentRegistrationNo, studentFaculty, studentCampus, 
        studentContactNo, issueType, issueMessage, issueAttachment, issueStatus, issueResolvedBy, 
        issueCreatedDate, issueResolvedDate, issueResolvedMessage, issuePriority } = req.body;
  
    let calculatedPriority = issuePriority; 
  
    // Assign issuePriority based on issueType
    if (['REQUEST_DOCUMENTS', 'CONVOCATION_ISSUE', 'CAMPUS_ENVIRONMENT_ISSUE', 
         'MODULE_CONTENT_ISSUE', 'OTHER_ISSUE'].includes(issueType)) {
        calculatedPriority = 2;
    } else if (['REGISTRATION_ISSUE', 'EXAMINATION_ISSUE', 'PAYMENT_ISSUE'].includes(issueType)) {
        calculatedPriority = 1;
    }

    if (!studentName || !studentEmail || !studentRegistrationNo || !studentFaculty || 
        !studentCampus || !studentContactNo || !issueType || !issueMessage) {
        return res.status(400).json({ message: 'These fields are required!' });
    }
  
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
        issuePriority: calculatedPriority
    });
  
    try {
      // Save the issue to the database
      await newIssue.save();
      console.log('Issue saved to the database successfully');
  
      // Construct Kafka message with key-value structure
      const kafkaMessage = {
        key: calculatedPriority.toString(), // Key as issue priority
        value: JSON.stringify({UserId,issueType,issueMessage,issueStatus})
      };
  
      // Send the issue to the Kafka topic
      await producer.send({
        topic: 'issueRequests',
        messages: [kafkaMessage]
      });
  
      console.log('Issue sent to Kafka topic successfully');
  
      res.json({ message: "Issue created and sent to Kafka successfully" });
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'An error occurred while processing the issue' });
    }
};

//view all issues by userId
const getAllIssuesByUserId = async (req, res) => {
    const UserId = req.params.id;

    try {
        const issues = await Issue.find({ UserId: UserId });
        // Respond with the issues
        res.json(issues);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// View all issues sorted by issuePriority (high to low)
const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().sort({ issuePriority: -1 });
        // Respond with the sorted issues
        res.json(issues);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
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

    try {
        // Update the issue in the database and return the updated document
        const updatedIssue = await Issue.findByIdAndUpdate(issueId, updateIssue, { new: true });

        if (!updatedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        // Send the updated issue to the Kafka topic
        await producer.send({
            topic: 'issueRequests', 
            messages: [
                { value: JSON.stringify(updatedIssue) }
            ]
        });
        console.log('Updated issue sent to Kafka topic successfully');

        res.json("Issue updated and sent to Kafka successfully");
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//delete issue by id
const deleteIssue = async (req, res) => {

    let issueId = req.params.id;

    try {
        // Find the issue before deleting it
        const deletedIssue = await Issue.findById(issueId);

        if (!deletedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        // Delete the issue from the database
        await Issue.findByIdAndDelete(issueId);

        res.json("Issue deleted successfully");
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: "Internal server error" });
    }
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
        console.error('Error:', error);
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
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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

        // Send the updated issue to the Kafka topic
        // await producer.send({
        //     topic: 'issueRequests',
        //     messages: [
        //         { value: JSON.stringify(updatedIssue) }
        //     ]
        // });
        // console.log('Updated issue priority sent to Kafka topic successfully');

        res.status(200).json({ message: 'Issue priority updated successfully', updatedIssue });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createIssue, getAllIssuesByUserId, getAllIssues, updateIssue, deleteIssue, searchIssue, updateIssueStatus, resolveIssue, updateIssuePriority };