const router = require("express").Router();

const { createIssueType, getAllIssueTypes, updateIssueType, deleteIssueType, updateIssueTypePriority } = require('../Controllers/issueTypeController');

//create new issue type
router.post('/', createIssueType);

//view all issue types
router.get('/', getAllIssueTypes);

//update an issue type by id
router.put('/updateIssueType/:id', updateIssueType);

//delete an issue type by id
router.delete('/deleteIssueType/:id', deleteIssueType);

//update issue type priority by id
router.patch('/updateIssueTypePriority/:id', updateIssueTypePriority);

module.exports = router;